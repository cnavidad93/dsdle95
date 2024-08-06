"use client";
import { cn, SessionData } from "@/lib";
import React from "react";
import Card, { CardContent, CardHeader } from "./ui/card";
import Button from "./ui/button";
import { motion } from "framer-motion";
import Arrow from "./svg/arrow";

export default function Guesses({ data }: { data: SessionData["tryList"] }) {
  if (data.length == 0) return null;

  return (
    <Card
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader>
        <span className="w-full text-center">You have tried:</span>
      </CardHeader>
      <CardContent>
        <div className="w-full min-w-[240px]">
          <ul className="">
            <li
              className="grid gap-2"
              style={{ gridTemplateColumns: "24px repeat(6, minmax(0, 1fr))" }}
            >
              <span className="text-center text-sm font-bold text-black"></span>
              <span className="text-center text-sm font-bold text-black">
                Name
              </span>
              <span className="text-center text-sm font-bold text-black">
                Game
              </span>
              <span className="text-center text-sm font-bold text-black">
                Location
              </span>
              <span className="text-center text-sm font-bold text-black">
                Optional
              </span>
              <span className="text-center text-sm font-bold text-black">
                Currency
              </span>
              <span className="text-center text-sm font-bold text-black">
                Phases
              </span>
            </li>
            {data
              .map((item, index) => (
                <li key={index} className="mt-1">
                  <Guess guess={item} index={index + 1} />
                </li>
              ))
              .reverse()}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function Guess({
  guess,
  index,
}: {
  guess: SessionData["tryList"][0];
  index: number;
}) {
  const items = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.div
      className="grid gap-2"
      style={{ gridTemplateColumns: "24px repeat(6, minmax(0, 1fr))" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delayChildren: 0.5,
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      <Button disabled>{index}</Button>
      <motion.div variants={items}>
        <Button className="w-full" variant={guess.name.status} disabled>
          {guess.name.value}
        </Button>
      </motion.div>
      <motion.div variants={items}>
        <Button className="w-full" variant={guess.game.status} disabled>
          {guess.game.value}
        </Button>
      </motion.div>
      <motion.div variants={items}>
        <Button className="w-full" variant={guess.location.status} disabled>
          {guess.location.value}
        </Button>
      </motion.div>
      <motion.div variants={items}>
        <Button className="w-full" variant={guess.optional.status} disabled>
          {guess.optional.value}
        </Button>
      </motion.div>
      <motion.div className="relative" variants={items}>
        <Button className="w-full" variant={guess.currency.status} disabled>
          {guess.currency.value}
        </Button>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {guess.currency.direction && (
            <Arrow
              height={60}
              className={cn(
                "opacity-20",
                guess.currency.direction == "UP" ? "rotate-180" : "",
              )}
            />
          )}
        </div>
      </motion.div>
      <motion.div variants={items}>
        <Button className="w-full" variant={guess.phases.status} disabled>
          {guess.phases.value}
        </Button>
      </motion.div>
    </motion.div>
  );
}
