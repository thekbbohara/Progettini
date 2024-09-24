"use client";
import { useState } from "react";
import GameBoard from "@/components/GameBoard";
import ScoreBoard from "@/components/ScoreBoard";
import GameContextProvider from "@/contex/gameContextProvide";

export default function Home() {
  return (
    <main className="p-10">
      <GameContextProvider>
        <ScoreBoard  />
        <GameBoard />
      </GameContextProvider>
    </main>
  );
}
