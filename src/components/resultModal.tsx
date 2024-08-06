import { SessionData } from "@/lib";
import { IronSession } from "iron-session";
import Image from "next/image";
import ResultTitle from "./resultTitle";
import Card, { CardContent, CardHeader } from "./ui/card";
import Modal from "./ui/modal";
import ResultClipboard from "./resultClipboard";

export default function ResultModal({
  session,
}: {
  session: IronSession<SessionData>;
}) {
  const showModal = session.isGameover || session.isWinner;
  if (!showModal) return null;

  return (
    <Modal open={showModal}>
      <Card>
        <CardHeader withActions>
          <span className="text-xl">
            {session.isWinner ? "Congratulations" : "Game Over"}
          </span>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex w-full flex-col items-center">
            <ResultTitle
              isWinner={session.isWinner}
              isGameOver={session.isGameover}
            />

            <p className="mt-6 text-lg text-black">
              The answer was: <span className="text-2xl">{session.name}</span>
            </p>

            {session.imageUrl && (
              <Image src={session.imageUrl} alt="" width={400} height={203} />
            )}

            <ResultClipboard guesses={session.tryList} />
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
}
