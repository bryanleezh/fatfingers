import { useMemo } from "react"
import Character from "./Character";

type TextContainerProps = {
    word: string
};

export default function TextContainer( {word} : TextContainerProps ) {
    const gameText = useMemo(() => {
        return word.split('');
    }, [word]);

    return (
        <div className="relative left-0 top-0 break-all text-2xl opacity-60">
            {gameText.map((char, index) => {
                return (
                    <Character key={index + char} char={char} /> 
                )
            })}
        </div>
    )
}