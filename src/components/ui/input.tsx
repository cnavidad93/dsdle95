"use client";
import { useFormStatus } from "react-dom";

export function Input() {
  const { pending } = useFormStatus();

  return (
    <input
      type="text"
      disabled={pending}
      name="name"
      placeholder="Boss name.."
      required
      autoComplete="off"
      className="border-l-2 border-t-2 border-l-zinc-500 border-t-zinc-500 p-1 text-black outline-none"
    />
  );
}
