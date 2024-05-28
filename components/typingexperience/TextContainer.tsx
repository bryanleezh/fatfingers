import { useMemo } from "react"

type TextContainerProps = {
    word: string
};

export default function TextContainer( {word} : TextContainerProps ) {
    const gameText = useMemo(() => {
        return word.split('');
    }, [word]);

    return (
        <div className="relative left-0 top-0 break-all text-2xl opacity-80 lg:text-2xl">
            {gameText.map((char, index) => {
                return ( 
                    <span 
                        key={index + char} 
                        className="text-primary font-mono"
                        // TODO: Add variable font
                    >
                        {char}
                    </span>
                )
            })}
        </div>
    )
}