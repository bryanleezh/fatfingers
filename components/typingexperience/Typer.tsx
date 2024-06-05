'use client';

import { useGameStateStore } from "@/store/gameState";
import CustomizeBar from "./CustomizeBar";
import TyperInput from "./TyperInput";
import { useEffect, useState } from "react";

// TODO: Add conditional for game start to replace CustomizeBar with timer
export default function Typer() {
    const [fadeClass, setFadeClass] = useState<string>(''); 
    const gameStart = useGameStateStore((state) => state.gameStart);

    useEffect(() => {
        if (gameStart) {
            setFadeClass('fade-out');
        } else {
            setFadeClass('');
        }
    }, [gameStart]); //

    // TODO: Implement words mode
    return (
        <div className="flex flex-col gap-4 w-3/4 flex-grow items-center justify-center">
            <div className="w-full flex items-center justify-center">
                <div className={`fade ${fadeClass}`}>
                    <CustomizeBar />
                </div>
            </div>
            <div className="flex flex-grow items-center justify-center w-full">
                <TyperInput />
            </div>
        </div>
    )
};