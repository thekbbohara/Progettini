import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IgameContext {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  playerChoice: number | null;
  setPlayerChoice: Dispatch<SetStateAction<number | null>>;
  botChoice: number | null;
  setBotChoice: Dispatch<SetStateAction<number | null>>;
}

export const gameContext = createContext<IgameContext | undefined>(undefined);

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState<number>(0);
  const [playerChoice, setPlayerChoice] = useState<number | null>(null);
  const [botChoice, setBotChoice] = useState<number | null>(null);
  return (
    <gameContext.Provider
      value={{
        score,
        setScore,
        playerChoice,
        setPlayerChoice,
        botChoice,
        setBotChoice,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

// custom useGameContext hook
export const useGameContext = () => {
  const context = useContext(gameContext);
  if (context === undefined) {
    throw new Error("useGameContext mustbe used inside GameContextProvider");
  }
  return context;
};
export default GameContextProvider;
