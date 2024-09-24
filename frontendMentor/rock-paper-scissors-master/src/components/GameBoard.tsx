"use client";
import Image from "next/image";
import ResultBoard from "./resultBoard";

import { useGameContext } from "@/contex/gameContextProvide";
import Rules from "./rules";
type playerChoiceType = "rock" | "paper" | "scissors";
const GameBoard = () => {
  const { playerChoice, setPlayerChoice } = useGameContext();

  const choices: playerChoiceType[] = ["rock", "paper", "scissors"];
  return (
    <>
      <Rules />
      {playerChoice !== null ? (
        <ResultBoard />
      ) : (
        <section className="relative mt-6 mx-auto grid grid-cols-2 gap-12 place-items-center place-content-center max-w-[500px] ">
          <Image
            alt="<>"
            src="/images/bg-triangle.svg"
            width={280}
            height={280}
            className="absolute z-[-1]"
          />
          {choices.map((choice, i) => (
            <div
                    key={i}
              onClick={() => {
                setPlayerChoice(i);
              }}
              className={`${choice} ${i === choices.length - 1 && "col-span-2"} max-w-36 w-full rounded-full min-h-36  flex justify-center items-center`}
            >
              <div className="flex justify-center items-center bg-white rounded-full w-[80%] h-[80%] aspect-square shadow-black">
                <Image
                  src={`/images/icon-${choice}.svg`}
                  alt={choice}
                  width={80}
                  height={80}
                />
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default GameBoard;
