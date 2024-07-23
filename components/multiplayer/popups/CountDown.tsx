import { useGameStateStore } from "@/store/gameState";
import { useEffect, useRef, useState } from "react";

type CountDownProps = {
    // countDown: boolean;
    onTimeUp: () => void;
}

export default function CountDown({onTimeUp} : CountDownProps) {
    const [timer, setTimer] = useState<number>(5);
    const countDown = useGameStateStore((state) => state.countDown);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (countDown) {
            setTimer(5);
            intervalRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (!countDown && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [countDown]);

    useEffect(() => {
        if (timer <= 0 && countDown) {
            onTimeUp();
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setTimer(5);
        }
    }, [timer, countDown, onTimeUp]);

    return (
        <div className={`${countDown ? '' : 'hidden'} fixed bg-background rounded-lg border p-6 w-full max-w-md flex flex-col items-center gap-6`}>
            <div className="text-sm text-muted-foreground">Get ready...</div>
            <div className="text-sm text-muted-foreground text-center">Click on the blurred text to begin once this countdown ends!</div>
            <div className="text-4xl font-bold text-primary">
                <span>00</span>:<span>{timer}</span>
            </div>
        </div>
    )
}