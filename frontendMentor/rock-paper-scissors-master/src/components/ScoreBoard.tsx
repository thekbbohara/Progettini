import { useGameContext } from "@/contex/gameContextProvide";
import checkWinner from "@/lib/checkWinner";
import React, { useEffect } from "react";

const ScoreBoard = () => {
  const { playerChoice, setBotChoice, score, setScore } = useGameContext();

  useEffect(() => {
    if (playerChoice === null) return;
    const randNum = Math.floor(Math.random() * 3);
    setBotChoice(randNum);
    if (checkWinner(playerChoice, randNum)) {
      setScore(score + 1);
    }
  }, [playerChoice]);
  return (
    <header className="flex justify-between border mx-auto border-white max-w-lg rounded-md p-4">
      <div className="flex flex-col text-[#cdd6f4] gap-0 ">
        <strong className="text-4xl font-bold ">ROCK</strong>
        <strong className="text-4xl font-extrabold leading-3">PAPER</strong>
        <strong className="text-4xl font-bold ">SCISSOR</strong>
      </div>
      <div className="flex flex-col text-[#cdd6f4]">
        <em className="font-semibold text-2xl">Score</em>
        <strong className="font-semibold text-6xl ">{score}</strong>
      </div>
    </header>
  );
};

export default ScoreBoard;
