import { SubmitButton } from "@/components/submitButton";
import Autocomplete from "@/components/ui/autocomplete";
import Card from "@/components/ui/card";
import { BossHint } from "@/lib";
import { verify } from "../app/actions";

export function GameForm({ options }: { options: BossHint[] }) {
  return (
    <form action={verify} className="">
      <Card
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-row items-center gap-2 bg-zinc-400 px-2 py-1">
          <div className="block text-lg">
            <Autocomplete options={options} />
          </div>
          <SubmitButton />
        </div>
      </Card>
    </form>
  );
}
