import { RotateCcw } from "lucide-react";

type GameCompleteProps = {
    allUsersComplete: boolean;
    userPosition: number | undefined;
    onReset: () => void;
}

export default function GameComplete({allUsersComplete, userPosition, onReset} : GameCompleteProps) {
    const displayPosition = ( position : number | undefined = 0 ) => {
        if (position === undefined || position === null) {
            return "Unknown";
        }
        if ( position === 1 ) {
            return "1st";
        } else if (position === 2) {
            return "2nd";
        } else if (position === 3) {
            return "3rd";
        } else {
            return `${position}th`;
        }
    }

    return (
        <div className={`${allUsersComplete ? '' : 'hidden'} fixed bg-background rounded-lg border p-6 w-full max-w-md flex flex-col items-center gap-6`}>
            <div className="text-2xl font-bold text-primary">Game Complete!</div>
            <div className="text-xl text-muted-foreground text-center">You placed: {displayPosition(userPosition)}</div>
            <button className="rounded-full hover:bg-accent" onClick={onReset}>
                <RotateCcw className="text-primary text-2xl gap-3"/>
            </button>
        </div>
    )
}