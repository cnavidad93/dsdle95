import { cn, GuessStatus } from "@/lib";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: GuessStatus;
}

export default function Button({
  children,
  className,
  variant,
  ...options
}: ButtonProps) {
  let style =
    "bg-zinc-400 text-black border-b-zinc-500 border-r-zinc-500 active:bg-zinc-500";
  if (variant === "CORRECT") {
    style =
      "bg-green-500 text-white border-b-green-600 border-r-green-600 active:bg-green-600";
  } else if (variant === "SIMILAR") {
    style =
      "bg-yellow-500 text-white border-b-yellow-600 border-r-yellow-600 active:bg-yellow-600";
  } else if (variant === "WRONG") {
    style =
      "bg-red-500 text-white border-b-red-600 border-r-red-600 active:bg-red-600";
  }

  return (
    <button
      {...options}
      className={cn(
        "min-h-[24px] w-max min-w-[24px] border-2 border-l-white border-t-white p-1 disabled:cursor-default",
        style,
        className,
      )}
    >
      {children}
    </button>
  );
}
