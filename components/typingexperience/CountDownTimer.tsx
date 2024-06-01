import { useSettingsStore } from "@/store/settings";
import { useEffect, useRef, useState } from "react";

type CountDownTimerProps = {
    gameStart: boolean;
    onTimeUp: () => void;
}

export default function CountDownTimer({ gameStart, onTimeUp} : CountDownTimerProps) {
    const time = useSettingsStore((state) => state.time);
    const [countdown, setCountdown] = useState<number>(time);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (gameStart) {
            intervalRef.current = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (!gameStart && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [gameStart]);

    useEffect(() => {
        if (countdown <= 0 && gameStart) {
            onTimeUp();
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [countdown, gameStart, onTimeUp]);

    useEffect(() => {
        if (!gameStart) {
            setCountdown(time);
        }
    }, [gameStart, time]);

    return (
        <div className="flex items-center justify-center h-full">
            <span className="text-primary font-mono break-all text-xl">{countdown}</span>
        </div>

    )
}