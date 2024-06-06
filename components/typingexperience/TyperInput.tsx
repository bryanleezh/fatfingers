"use client";

import { useSettingsStore } from "@/store/settings";
import TextWrapper from "./TextWrapper";
import TextContainer from "./TextContainer";
import Input from "./Input";
import ResetGame from "./ResetGame";
import { useGameStateStore } from "@/store/gameState";
import useKeyPressListener from "@/hooks/useKeyPressListener";
import { useCallback, useEffect, useRef, useState } from "react";
import CountDownTimer from "./CountDownTimer";
import generateWord from "@/utils/generateWord";
import MainResults from "../results/MainResults";
import CustomCaret from "./CustomCaret";

export default function TyperInput() {
    const [fadeClass, setFadeClass] = useState<string>('fade fade-out');
    const [inputFadeClass, setInputFadeClass] = useState<string>('fade');
    const [resultsFadeClass, setResultsFadeClass] = useState<string>('fade fade-out');
    const textContainerRef = useRef<HTMLHeadingElement>(null);
    const [lineCharsNum, setLineCharsNum] = useState<number>(-1);
    const [inputLine, setInputLine] = useState<number>(0);

    // Settings store
    const time = useSettingsStore((state) => state.time);
    const mode = useSettingsStore((state) => state.mode);
    const resetKey = useSettingsStore((state) => state.resetKey);
    
    // Gamestate store
    const isFocused = useGameStateStore((state) => state.isFocused);
    const gameStart = useGameStateStore((state) => state.gameStart);
    const endGame = useGameStateStore((state) => state.endGame);
    const cursor = useGameStateStore((state) => state.cursor);
    const setFocused = useGameStateStore((state) => state.setFocused);
    const setGameStart = useGameStateStore((state) => state.setGameStart);
    const setEndGame = useGameStateStore((state) => state.setEndGame);
    const setIncreaseCursor = useGameStateStore((state) => state.setIncreaseCursor);
    const setDecreaseCursor = useGameStateStore((state) => state.setDecreaseCursor);
    const setResetCursor = useGameStateStore((state) => state.setResetCursor);  

    // typing module
    const [para, setPara] = useState<string>(""); 
    const [userInput, setUserInput] = useState<string>("");
    
    useEffect(() => {
        setPara(generateWord(30));
    }, []);

    const resetGame = () => {
        setUserInput("");
        setPara(generateWord(30));
        setResetCursor();
        setGameStart(false);
    };
    
    // ! this function can just be to setendgame to display the results, the rest of the results can be calculated,retrieved and then set from there
    const gameComplete = () => {
        // flag for game state
        setFocused(false);
        setGameStart(false);
        setFadeClass("fade fade-out");
        setInputFadeClass("fade fade-out");
        setTimeout(() => {
            setEndGame(true);
            setResultsFadeClass('fade');
        }, 500);
    };

    // function to close results component
    const resultsClose = () => {
        setResultsFadeClass("fade fade-out");
        setInputFadeClass("fade");
        setTimeout(() => {
            setFadeClass('fade fade-out');
            resetGame();
            setEndGame(false);
        }, 500); 
    }

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
    
    const updateLineCharsNum = () => {
        if (textContainerRef.current) {
            const charWidth = 14; // Adjust this value based on your character width
            const containerWidth = textContainerRef.current.offsetWidth;
            setLineCharsNum(Math.floor(containerWidth / charWidth));
        }
    };
    
    // Listener for keyboard events
    useKeyPressListener({ isFocused, resetKey, onKeyPress: handleKeyPress });
    
    useEffect(() => {
        if (gameStart) {
            setFadeClass('fade');
        } else {
            setFadeClass('fade fade-out');
        }
    }, [gameStart]);

    useEffect(() => {
        if (gameStart && isFocused === false) {
            setFadeClass("fade fade-out");
            setGameStart(false);
        }
    }, [isFocused]);

    useEffect(() => {
        updateLineCharsNum();
        window.addEventListener('resize', updateLineCharsNum);
        return () => {
            window.removeEventListener('resize', updateLineCharsNum);
        };
    }, [textContainerRef.current]);


    useEffect(() => {
        // TODO: Figure out how to calculate width of text container
        // TODO: Reset customcaret left to 0
        // TODO: Add regenerate para function here
        // TODO: Store the prev input + para so that more can be typed
        if (cursor >= lineCharsNum && lineCharsNum >= 0) {
            setInputLine((prev) => prev + 1);
            setResetCursor();
        };
    }, [cursor, lineCharsNum]);
    
    // TODO: Add font theming
    // TODO: On complete of all words, need to generate new set of words for para
    return (
        <div className="w-full h-full mx-auto flex flex-col items-center justify-center max-w-5xl gap-4 px-4 xl:px-0">
            {endGame ? 
                <div className={`${resultsFadeClass}`}>
                    <MainResults userInput={userInput} para={para} onRestartGame={resultsClose}/>
                </div>
                :   
                <div className={`${inputFadeClass}`} ref={textContainerRef}>
                    <div className={`${fadeClass}`}>
                        <CountDownTimer gameStart={gameStart} onTimeUp={gameComplete} />
                    </div>
                    <TextWrapper>
                        <TextContainer para={para}/>
                        <Input userInput={userInput} para={para} />
                        <CustomCaret left={cursor} top={inputLine}/>
                        <ResetGame reset={resetGame} />
                    </TextWrapper>
                </div> 
            }
        </div>
    )
};