import Image from "next/image";
import { fetchOptions, getSession } from "./actions";
import { GameForm } from "@/components/gameForm";
import Guesses from "@/components/guesses";
import ImageWindow from "@/components/imageWindow";
import ResultModal from "@/components/resultModal";

export default async function Test() {
  const session = await getSession();
  const options = await fetchOptions();
  const filteredOptions = options.filter(
    (option) => !session.optionsUsed.includes(option.id),
  );
  const gameFinished = session.isGameover || session.isWinner;

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 px-8 py-2 text-white 2xl:gap-8">
      <div>
        <Image src="/title.png" alt="DSdle" width={200} height={204} />
      </div>
      <ImageWindow
        title={gameFinished ? session.name : "Game"}
        imageUrl={session.imageUrl}
      />

      {!gameFinished && <GameForm options={filteredOptions} />}

      <Guesses data={session.tryList} />

      <ResultModal session={session} />
    </main>
  );
}
