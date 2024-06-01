"use client";

import { useSettingsStore } from "@/store/settings";
import TextWrapper from "./TextWrapper";
import TextContainer from "./TextContainer";
import Input from "./Input";
import ResetGame from "./ResetGame";
import { useGameStateStore } from "@/store/gameState";
import useKeyPressListener from "@/hooks/useKeyPressListener";
import { useCallback, useState } from "react";
import CountDownTimer from "./CountDownTimer";

export default function TyperInput() {
    const time = useSettingsStore((state) => state.time);
    const mode = useSettingsStore((state) => state.mode);
    const resetKey = useSettingsStore((state) => state.resetKey);
    const setResetKey = useSettingsStore((state) => state.setResetKey);
    
    // Gamestate store
    const isFocused = useGameStateStore((state) => state.isFocused);
    const gameStart = useGameStateStore((state) => state.gameStart);
    const endGame = useGameStateStore((state) => state.endGame);
    const cursor = useGameStateStore((state) => state.cursor);
    const setGameStart = useGameStateStore((state) => state.setGameStart);
    const setEndGame = useGameStateStore((state) => state.setEndGame);
    const setIncreaseCursor = useGameStateStore((state) => state.setIncreaseCursor);
    const setDecreaseCursor = useGameStateStore((state) => state.setDecreaseCursor);
    const setResetCursor = useGameStateStore((state) => state.setResetCursor);  

    // TODO: Add generate word function with mode as param
    const word = "provided pish aboard without helpless crisp and exactly escalator yippee behind ack vector misconceive unabashedly per steep once gadzooks sight mmm throughout longingly vice appropriate versus desire plastic hm eek";
    const [userInput, setUserInput] = useState("");
    
    // TODO: Add timer countdown component

    // TODO: Add reset game state, which would regenerate a new word string to be typed
    const resetGame = () => {
        console.log("game reset");
        setUserInput("");
        setResetCursor();
        setGameStart(false);
    };
    
    // ! this function can just be to setendgame to display the results, the rest of the results can be calculated,retrieved and then set from there
    const gameComplete = () => {
        // flag for game state
        setGameStart(false);
        console.log("show results");
        // flag for showing results 
        setEndGame(true);
    };

    const handleKeyPress = useCallback((key: string) => {
        if (gameStart) {
            if (key === "Backspace") {
                setUserInput((prev) => prev.slice(0,-1));
                setDecreaseCursor();
            } else if (key === resetKey) {
                resetGame();
            } else {
                setUserInput((prev) => prev + key);
                setIncreaseCursor();
            }
        } else {
            const isAlphanumeric = /^[a-zA-Z0-9]$/.test(key)
            if (isAlphanumeric) {
                // start countdown
                setGameStart(true);
                setUserInput((prev) => prev + key);
                setIncreaseCursor();
            }
        }
    }, [resetKey, resetGame, setIncreaseCursor, setDecreaseCursor]);
    
    // TODO: Add setting of scoring

    // TODO: Create custom caret

    // Listener for keyboard events
    useKeyPressListener({ isFocused, resetKey, onKeyPress: handleKeyPress });


    // TODO: Add font theming
    // TODO: Add smooth cursor to input
    // TODO: Add separate cursor with smooth logic
    // TODO: Add scoring logic
    return (
        <div className="w-full h-full mx-auto flex flex-col items-center justify-center max-w-5xl gap-4 px-4 xl:px-0">
            {/* <CountDownTimer gameStart={gameStart} onTimeUp={gameComplete} /> */}
            <TextWrapper>
                <TextContainer word={word}/>
                <Input userInput={userInput} word={word} />
                <ResetGame reset={resetGame} />
            </TextWrapper>
        </div>
    )
};