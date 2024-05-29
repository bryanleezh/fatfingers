import { useCallback, useMemo } from "react";
import Character from "./Character";

type InputProps = {
    word: string,
}

export default function Input( { word } : InputProps) {
    const userInput: string = "provided pisk";
    const userInputs = useMemo(() => {
        return userInput.split('');
    }, [userInput]);
    
    // implement check characters function
    const checkChar = useCallback(
        (index: number) => {
            return word[index] === userInput[index];
        },
        [userInput, word]
    );
    // implement keydown?
    return (
        <div className="absolute left-0 top-0 z-10 break-all text-2xl">
            {userInputs.map((char, index) => {
                return (
                    <Character key={index + char} char={word[index]} state={checkChar(index)}/>
                )
            })}
        </div>
    )
}