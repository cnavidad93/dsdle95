import "server-only";
import dbData from "../../public/ds1.json";

import {
  Boss,
  BossHint,
  defaultSession,
  GUESS_DIRECTION,
  GUESS_STATUS,
  GuessStatus,
  GuessWithDirection,
  SessionData,
  sessionOptions,
} from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath, unstable_cache } from "next/cache";
import { cookies } from "next/headers";

const MAX_TRIES = 6;

const INTERNAL__fetchBoss = () => {
  return new Promise<Boss>((resolve) => {
    setTimeout(() => {
      resolve(dbData[4] as Boss);
    }, 300);
  });
};

const INTERNAL__fetchOptions = () => {
  return new Promise<BossHint[]>((resolve) => {
    setTimeout(() => {
      resolve(
        (dbData as Boss[]).map((boss) => ({
          name: boss.name,
          game: boss.game,
          location: boss.location,
          currency: boss.currency,
          optional: boss.optional,
          phases: boss.phases,
        })),
      );
    }, 300);
  });
};

const fetchBoss = unstable_cache(INTERNAL__fetchBoss, ["boss"], {
  revalidate: 60 * 30,
});

export const fetchOptions = unstable_cache(
  INTERNAL__fetchOptions,
  ["options"],
  {
    revalidate: 60 * 60 * 24 * 7,
  },
);

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    const boss = await fetchBoss();

    session.name = defaultSession.name;
    session.tryList = defaultSession.tryList;
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.isGameover = defaultSession.isGameover;
    session.isWinner = defaultSession.isWinner;
    session.imageUrl = boss.steps[0];
    session.optionsUsed = defaultSession.optionsUsed;
  }

  return session;
}

const validateName = (name: string, boss: Boss): GuessStatus => {
  if (name.toLowerCase() === boss.name.toLowerCase()) {
    return GUESS_STATUS.CORRECT;
  }

  if (name.toLowerCase().includes(boss.name.toLowerCase())) {
    return GUESS_STATUS.SIMILAR;
  }

  return GUESS_STATUS.WRONG;
};

const booleanValidator = <T>(value: T, compare: T): GuessStatus => {
  return value === compare ? "CORRECT" : "WRONG";
};

const getDirection = (
  value: number,
  compare: number,
): GuessWithDirection["direction"] => {
  if (value === compare) {
    return null;
  }
  return value > compare ? GUESS_DIRECTION.UP : GUESS_DIRECTION.DOWN;
};

export async function verify(formData: FormData) {
  "use server";

  const session = await getSession();
  if (session.isGameover) {
    return;
  }

  const boss = await fetchBoss();
  const currentTry = session.tryList.length + 1;
  const guess = JSON.parse(formData.get("guess") as string) as BossHint;

  session.imageUrl = boss.steps[currentTry];
  session.tryList = session.tryList || [];
  session.tryList.push({
    name: {
      value: guess.name,
      status: validateName(guess.name, boss),
    },
    location: {
      value: guess.location,
      status: booleanValidator(guess.location, boss.location),
    },
    game: {
      value: guess.game,
      status: booleanValidator(guess.game, boss.game),
    },
    currency: {
      value: guess.currency.toString(),
      status: booleanValidator(guess.currency, boss.currency),
      direction: getDirection(guess.currency, boss.currency),
    },
    optional: {
      value: guess.optional ? "Yes" : "No",
      status: booleanValidator(guess.optional, boss.optional),
    },
    phases: {
      value: guess.phases ? "Yes" : "No",
      status: booleanValidator(guess.phases, boss.phases),
    },
  });

  if (currentTry === MAX_TRIES) {
    session.isGameover = true;
    session.imageUrl = boss.image;
    session.name = boss.name;
  }
  if (guess.name === boss.name) {
    session.isWinner = true;
    session.imageUrl = boss.image;
    session.name = boss.name;
  }

  await session.save();
  revalidatePath("/");
}
