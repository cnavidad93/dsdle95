"use client";

import { useFormStatus } from "react-dom";
import Button from "./ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="border-b-blue-950 border-r-blue-950 bg-blue-900 text-white active:bg-blue-950"
      type="submit"
      disabled={pending}
    >
      Send
    </Button>
  );
}
