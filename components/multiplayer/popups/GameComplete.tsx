import { RotateCcw } from "lucide-react";

type GameCompleteProps = {
    allUsersComplete: boolean;
    userPosition: number;
    onReset: () => void;
}

export default function GameComplete({allUsersComplete, userPosition, onReset} : GameCompleteProps) {
    return (
        <div className={`${allUsersComplete ? '' : 'hidden'} fixed bg-background rounded-lg border p-6 w-full max-w-md flex flex-col items-center gap-6`}>
            <div className="text-sm text-muted-foreground">Game Complete!</div>
            <div className="text-sm text-muted-foreground text-center">You placed: {userPosition}</div>
            <button className="rounded-full hover:bg-accent" onClick={onReset}>
                <RotateCcw className="text-primary text-2xl gap-3"/>
            </button>
        </div>
    )
}