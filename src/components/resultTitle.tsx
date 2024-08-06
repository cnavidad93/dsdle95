"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function ResultTitle({
  isWinner,
  isGameOver,
}: {
  isWinner: boolean;
  isGameOver: boolean;
}) {
  return (
    <motion.div
      className="relative h-[80px] w-[400px]"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Image
        src={isWinner ? "/winner.png" : "/game-over.png"}
        alt="Game Over"
        fill
      />
    </motion.div>
  );
}
