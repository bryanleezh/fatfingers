import { RotateCcw } from "lucide-react";

type resetGameProps = {
    reset: () => void;
}

export default function ResetGame( { reset } : resetGameProps ) {
    return (
        <div className="flex justify-center items-center pt-3">
            <button className="rounded-full hover:bg-accent" onClick={reset}>
                <RotateCcw className="text-primary text-2xl gap-3"/>
            </button>
        </div>
    )
}