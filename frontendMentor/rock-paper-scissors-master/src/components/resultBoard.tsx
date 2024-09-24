import Image from "next/image";
import checkWinner from "@/lib/checkWinner";
import { useGameContext } from "@/contex/gameContextProvide";
import Pride from "react-canvas-confetti/dist/presets/pride";

const ResultBoard = () => {
  const choices: string[] = ["rock", "paper", "scissors"];
  // const botChoice = Math.floor(Math.random() * choices.length);
  //
  const { score, setScore, playerChoice, setPlayerChoice, botChoice } =
    useGameContext();

  return (
    <>
      {score >= 3 && <Pride autorun={{ speed: 3 }} />}
      {playerChoice !== null && botChoice !== null && (
        <section className="flex gap-2 justify-center items-center my-4">
          <div
            className={`${playerChoice !== null && choices[playerChoice]} max-w-36 w-full rounded-full min-h-36  flex justify-center items-center`}
          >
            <div className="flex justify-center items-center bg-white rounded-full w-[80%] h-[80%] aspect-square shadow-black">
              <Image
                src={`/images/icon-${playerChoice !== null && choices[playerChoice]}.svg`}
                alt={
                  playerChoice !== null ? choices[playerChoice] : "playerChoice"
                }
                width={80}
                height={80}
              />
            </div>
          </div>
          <div>
            <div className="text-white text-center rounded-md text-3xl font-bold uppercase p-2 ">
              {checkWinner(playerChoice, botChoice) === null ? (
                <>draw</>
              ) : checkWinner(playerChoice, botChoice) === false ? (
                <>You loose</>
              ) : (
                <>you win</>
              )}
            </div>
            <button
              onClick={() => {
                setPlayerChoice(null);
                if (score >= 3) {
                  setScore(0);
                }
              }}
              className="bg-white text-black rounded-md text-3xl font-bold uppercase p-2 "
            >
              play again
            </button>
          </div>
          <div
            className={`${choices[botChoice]} max-w-36 w-full rounded-full min-h-36  flex justify-center items-center`}
          >
            <div className="flex justify-center items-center bg-white rounded-full w-[80%] h-[80%] aspect-square shadow-black">
              <Image
                src={`/images/icon-${choices[botChoice]}.svg`}
                alt={choices[playerChoice]}
                width={80}
                height={80}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ResultBoard;
