"use client";
import { GuessStatus, SessionData } from "@/lib";
import React from "react";
import Button from "./ui/button";

const getEmoji = (value: GuessStatus) => {
  switch (value) {
    case "CORRECT":
      return "🟩";
    case "SIMILAR":
      return "🟧";
    case "WRONG":
      return "🟥";
  }
};

export default function ResultClipboard({
  guesses,
}: {
  guesses: SessionData["tryList"];
}) {
  const copyToClipboard = () => {
    const text = guesses
      .map(
        (guess) =>
          `${getEmoji(guess.name.status)} ${getEmoji(
            guess.game.status,
          )} ${getEmoji(guess.location.status)} ${getEmoji(
            guess.optional.status,
          )} ${getEmoji(guess.currency.status)}`,
      )
      .join("\n");

    const date = new Date();

    navigator.clipboard.writeText(
      `DSdle 95 - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}\n${text}`,
    );
  };

  return (
    <div className="mb-4 mt-4 flex flex-col items-center gap-2">
      <div className="flex flex-col">
        {guesses.map((guess, index) => (
          <div key={index} className="flex flex-row">
            <div>{getEmoji(guess.name.status)}</div>
            <div>{getEmoji(guess.game.status)}</div>
            <div>{getEmoji(guess.location.status)}</div>
            <div>{getEmoji(guess.optional.status)}</div>
            <div>{getEmoji(guess.currency.status)}</div>
          </div>
        ))}
      </div>
      <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
    </div>
  );
}
