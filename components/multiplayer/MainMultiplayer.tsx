import { useCallback, useEffect, useRef, useState } from "react";
import CustomCaret from "../typingexperience/CustomCaret";
import Input from "../typingexperience/Input";
import TextContainer from "../typingexperience/TextContainer";
import TextWrapper from "../typingexperience/TextWrapper";
import { useGameStateStore } from "@/store/gameState";
import useKeyPressListener from "@/hooks/useKeyPressListener";

type MainMultiplayerProps = {
    para: string,
    onProgress: (progress: number) => void;
}

// TODO: Add logic on when someone enter the room, it will set new racer in minimap
// TODO: Add minimap for racers

export default function MainMultiplayer( {para, onProgress} : MainMultiplayerProps) {
    const [userInput, setUserInput] = useState<string>("");
    const textContainerRef = useRef<HTMLHeadingElement>(null);
    const [characterWidth, setCharacterWidth] = useState<number>(0);
    const [lineCharsNum, setLineCharsNum] = useState<number>(-1);
    const [inputLine, setInputLine] = useState<number>(0);

    const isFocused = useGameStateStore((state) => state.isFocused);
    const gameStart = useGameStateStore((state) => state.gameStart);
    const cursor = useGameStateStore((state) => state.cursor);
    const setCursor = useGameStateStore((state) => state.setCursor);
    const setIncreaseCursor = useGameStateStore((state) => state.setIncreaseCursor);
    const setDecreaseCursor = useGameStateStore((state) => state.setDecreaseCursor);
    const setResetCursor = useGameStateStore((state) => state.setResetCursor);  
    const setGameStart = useGameStateStore((state) => state.setGameStart);
    

    const resetGame = () => {
        setUserInput("");
        setResetCursor();
        onProgress(0);
    };
    
    // TODO: Add logic to start the race
    const handleKeyPress = useCallback((key: string) => {
        if (gameStart) {
            if (key === "Backspace") {
                setUserInput((prev) => prev.slice(0,-1));
                setDecreaseCursor();
                if (cursor === 0) {
                    setCursor(lineCharsNum - 1);
                    setInputLine((prev) => prev - 1);
                }
            } else {
                setUserInput((prev) => prev + key);
                setIncreaseCursor();
            }
        } 
        // else {
        //     const isAlphanumeric = /^[a-zA-Z0-9]$/.test(key)
        //     if (isAlphanumeric) {
        //         // start countdown
        //         setGameStart(true);
        //         setUserInput((prev) => prev + key);
        //         setIncreaseCursor();
        //     }
        // }
    }, [resetGame, setIncreaseCursor, setDecreaseCursor]);

    const calculateCharacterWidth = () => {
        const hiddenSpan = document.getElementById('hidden-measure');
        if (!hiddenSpan) return 0;
        const width = hiddenSpan.getBoundingClientRect().width;
        setCharacterWidth(width);
        return width;
    };

    const updateLineCharsNum = () => {
        if (textContainerRef.current) {
            const charWidth = calculateCharacterWidth();
            const containerWidth = textContainerRef.current.offsetWidth;
            setLineCharsNum(Math.floor(containerWidth / charWidth));
        }
    };

    useKeyPressListener({ isFocused, onKeyPress: handleKeyPress });

    useEffect(() => {
        if (gameStart && isFocused === false) {
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
        if (cursor >= lineCharsNum && lineCharsNum >= 0) {
            setInputLine((prev) => prev + 1);
            setResetCursor();
        };
        if (userInput.length === para.length) {            
            // TODO: Add logic to send to server complete para
            console.log("Game complete!");
        }
    }, [cursor, lineCharsNum]);

    useEffect(() => {
        const progress = Math.round((userInput.length / para.length) * 100);
        onProgress(progress);
    }, [userInput, para.length, onProgress]);

    return (
        <div className="w-full h-full mx-auto flex flex-col items-center justify-center max-w-5xl gap-4 px-4 xl:px-0">
            <div ref={textContainerRef}>
                <TextWrapper reset={resetGame} >
                    <TextContainer para={para} />
                    <Input userInput={userInput} para={para} />
                    <CustomCaret left={cursor} top={inputLine} characterWidth={characterWidth}/>
                </TextWrapper>
            </div>
        </div>
    )
}