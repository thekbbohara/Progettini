"use client";

import React, { useEffect, useState } from "react";

const checkWinner = (
  playerChoice: number,
  botChoice: number,
): null | true | false => {
  if (playerChoice === botChoice) return null;

  switch (playerChoice) {
    case 0:
      return botChoice === 2 ? true : false;
    case 1:
      return botChoice === 0 ? true : false;
    case 2:
      return botChoice === 1 ? true : false;
    default:
      throw new Error("Invalid choice");
  }
};
const Test = () => {
  const [score, setScore] = useState<number>(0);
  const [playerChoice, setPlayerChoice] = useState<0 | 1 | 2 | null>(null);
  // const botChoice = Math.floor(Math.random() * 3);
  const [botChoice, setBotChoice] = useState<number | null>(null);
  const choices = ["rock", "paper", "scissors"];
  useEffect(() => {
    if (playerChoice === null) return;
    console.log(playerChoice);
    const randNum = Math.floor(Math.random() * 3);
    console.log(checkWinner(playerChoice, randNum));
    setBotChoice(randNum);
    if (checkWinner(playerChoice, randNum)) {
      setScore(score + 1);
    }
  }, [playerChoice]);
  return (
    <>
      <h1>score : {score}</h1>
      <h1>player choice: {playerChoice !== null && choices[playerChoice]}</h1>
      <h1>bot choice: {botChoice !== null && choices[botChoice]}</h1>
      <div className="flex gap-2 *:bg-green-500 *:rounded-md *:p-2 mt-2">
        <button
          onClick={() => {
            setPlayerChoice(0);
          }}
        >
          rock
        </button>
        <button
          onClick={() => {
            setPlayerChoice(1);
          }}
        >
          paper
        </button>
        <button
          onClick={() => {
            setPlayerChoice(2);
          }}
        >
          scissors
        </button>
      </div>
    </>
  );
};

export default Test;
