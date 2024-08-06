import "server-only";

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
      resolve({
        id: "4",
        name: "Dark Sun Gwyndolin",
        game: "Dark Souls 1",
        image:
          "/2650e21200d93e08587965b479f8cdab/2650e21200d93e08587965b479f8cdab.jpg",
        location: "Anor Londo",
        currency: 40000,
        optional: true,
        phases: false,
        steps: [
          "/2650e21200d93e08587965b479f8cdab/93669188197d171b073c18c42413a139.jpg",
          "/2650e21200d93e08587965b479f8cdab/02fc9ca4dbebddf14e1c34f08cdeb197.jpg",
          "/2650e21200d93e08587965b479f8cdab/4f2cf4e303a70da40dd0eb7dd1fe9d03.jpg",
          "/2650e21200d93e08587965b479f8cdab/e7590e4864defcd25a066a38cd9bfca3.jpg",
          "/2650e21200d93e08587965b479f8cdab/02a91ff03fd8558175bc73a769d9411a.jpg",
          "/2650e21200d93e08587965b479f8cdab/65b4bec5acb6932ceb85976db162d948.jpg",
        ],
      });
    }, 300);
  });
};

const INTERNAL__fetchOptions = () => {
  return new Promise<BossHint[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Capra Demon",
          game: "Dark Souls 1",
          location: "Undead Burg",
          currency: 6000,
          optional: true,
          phases: false,
        },
        {
          id: "2",
          name: "Centipede Demon",
          game: "Dark Souls 1",
          location: "Demon Ruins",
          currency: 40000,
          optional: true,
          phases: false,
        },
        {
          id: "3",
          name: "Crossbreed Priscilla",
          game: "Dark Souls 1",
          location: "Painted World of Ariamis",
          currency: 30000,
          optional: true,
          phases: false,
        },
        {
          id: "4",
          name: "Dark Sun Gwyndolin",
          game: "Dark Souls 1",
          location: "Anor Londo",
          currency: 40000,
          optional: true,
          phases: false,
        },
        {
          id: "5",
          name: "Demon Firesage",
          game: "Dark Souls 1",
          location: "Demon Ruins",
          currency: 20000,
          optional: true,
          phases: false,
        },
        {
          id: "6",
          name: "Gaping Dragon",
          game: "Dark Souls 1",
          location: "Depths",
          currency: 25000,
          optional: true,
          phases: false,
        },
      ]);
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
