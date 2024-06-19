import { useCallback, useMemo } from "react";
import Character from "./Character";

type InputProps = {
    userInput: string;
    para: string;
}

export default function Input( { userInput, para } : InputProps) {
    const userInputs = useMemo(() => {
        return userInput.split('');
    }, [userInput]);
    
    // implement check characters function
    const checkChar = useCallback(
        (index: number) => {
            return para[index] === userInput[index];
        },
        [userInput, para]
    );

    return (
        <div className="absolute left-0 top-0 z-10 break-all text-2xl">
            {userInputs.map((char, index) => {
                return (
                    <Character key={index + char} char={para[index]} state={checkChar(index)}/>
                )
            })}
        </div>
    )
}