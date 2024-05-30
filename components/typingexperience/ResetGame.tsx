import { RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

type resetGameProps = {
    reset: () => void;
}

export default function ResetGame( { reset } : resetGameProps ) {
    return (
        <div className="flex justify-center items-center">
            <Button className="rounded-full" size="icon" variant="ghost" onClick={reset}>
                <RotateCcw className="text-primary text-2xl gap-3"/>
            </Button>
        </div>
    )
}