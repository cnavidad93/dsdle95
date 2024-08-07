import { SessionOptions } from "iron-session";
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export type Boss = {
  id?: string;
  name: string;
  image: string;
  location: string;
  currency: number;
  steps: string[];
  optional: boolean;
  game: string;
  phases: boolean;
};

export type BossHint = Omit<Boss, "steps" | "image">;

export const GUESS_STATUS = {
  CORRECT: "CORRECT" as const,
  SIMILAR: "SIMILAR" as const,
  WRONG: "WRONG" as const,
};

export type GuessStatus = (typeof GUESS_STATUS)[keyof typeof GUESS_STATUS];

export type Guess = {
  value: string;
  status: GuessStatus;
};

export const GUESS_DIRECTION = {
  UP: "UP" as const,
  DOWN: "DOWN" as const,
};

export type GuessDirection =
  (typeof GUESS_DIRECTION)[keyof typeof GUESS_DIRECTION];

export type GuessWithDirection = Guess & { direction: GuessDirection | null };

export type SessionData = {
  name: string;
  isLoggedIn: boolean;
  isGameover: boolean;
  isWinner: boolean;
  imageUrl?: string;
  optionsUsed: string[];
  tryList: Array<{
    name: Guess;
    location: Guess;
    currency: GuessWithDirection;
    game: Guess;
    optional: Guess;
    phases: Guess;
  }>;
};

export const defaultSession: SessionData = {
  name: "",
  tryList: [],
  isLoggedIn: true,
  isGameover: false,
  isWinner: false,
  optionsUsed: [],
};

export const sessionOptions: SessionOptions = {
  password: "yGbAN1EaNwG23oz9eVbzy7Y0DA2kdxRr",
  cookieName: "dsdle",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
