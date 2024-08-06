"use client";
import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import Button from "./button";
import Minimize from "../svg/minimize";
import Restore from "../svg/restore";
import Close from "../svg/close";
import { cn } from "@/lib";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export default function Card({ children, ...options }: CardProps) {
  return (
    <motion.article
      className="border-2 border-b-zinc-500 border-l-white border-r-zinc-500 border-t-white"
      {...options}
    >
      <div className="flex flex-col border-4 border-zinc-400 shadow-sm">
        {children}
      </div>
    </motion.article>
  );
}

export function CardHeader({
  children,
  withActions,
}: {
  children: React.ReactNode;
  withActions?: boolean;
}) {
  return (
    <header className="flex w-full flex-row items-center justify-between border-b-4 border-l-2 border-t-2 border-b-zinc-400 border-l-blue-950 border-t-blue-950 bg-blue-900 p-1 shadow-inner">
      {children}
      {withActions && (
        <div className="flex flex-row gap-1">
          <Button disabled>
            <Minimize width={16} />
          </Button>
          <Button disabled>
            <Restore width={16} />
          </Button>
          <Button disabled>
            <Close width={16} />
          </Button>
        </div>
      )}
    </header>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-fit w-fit flex-1 border-l-2 border-t-2 border-l-zinc-500 border-t-zinc-500 bg-zinc-300 shadow-inner",
        className,
      )}
    >
      {children}
    </div>
  );
}
