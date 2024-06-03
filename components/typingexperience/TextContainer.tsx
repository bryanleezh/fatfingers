import { useMemo } from "react"
import Character from "./Character";

type TextContainerProps = {
    para: string
};

export default function TextContainer( {para} : TextContainerProps ) {
    const gameText = useMemo(() => {
        return para.split('');
    }, [para]);

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