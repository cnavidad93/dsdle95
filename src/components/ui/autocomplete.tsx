"use client";
import Select from "react-select";
import { BossHint } from "@/lib";
import { useFormStatus } from "react-dom";

export default function Autocomplete({ options }: { options: BossHint[] }) {
  const { pending } = useFormStatus();
  return (
    <Select
      classNamePrefix="select"
      className="w-[360px]"
      isDisabled={pending}
      isClearable={false}
      isSearchable={true}
      name="guess"
      placeholder="Boss name..."
      required
      options={options}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => JSON.stringify(option)}
    />
  );
}
