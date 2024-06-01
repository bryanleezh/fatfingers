'use client';

import { useGameStateStore } from "@/store/gameState";
import CustomizeBar from "./CustomizeBar";
import TyperInput from "./TyperInput";
import { useSettingsStore } from "@/store/settings";
import CountDownTimer from "./CountDownTimer";

// TODO: Add conditional for game start to replace CustomizeBar with timer
export default function Typer() {
    // conditionally render either customize bar or countdown
    const time = useSettingsStore((state) => state.time);
    const gameStart = useGameStateStore((state) => state.gameStart);
    const endGame = useGameStateStore((state) => state.endGame);
    const setGameStart = useGameStateStore((state) => state.setGameStart);
    const setEndGame = useGameStateStore((state) => state.setEndGame);

    const gameComplete = () => {
        // flag for game state
        setGameStart(false);
        console.log("show results");
        // flag for showing results 
        setEndGame(true);
    };

    return (
        <div className="flex flex-col gap-4 w-3/4 flex-grow items-center justify-center">
            <div className="w-full h-12 flex items-center justify-center">
            {gameStart ? 
                <CountDownTimer gameStart={gameStart} onTimeUp={gameComplete} />
                : 
                <CustomizeBar />
            }
            </div>
            <div className="flex flex-grow items-center justify-center w-full">
                <TyperInput />
            </div>
        </div>
    )
};