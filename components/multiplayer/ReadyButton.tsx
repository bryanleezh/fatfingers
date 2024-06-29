import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useGameStateStore } from "@/store/gameState";

type ReadyButtonProps = {
    sendMessage: () => void;
}

export default function ReadyButton({sendMessage} : ReadyButtonProps) {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [fadeClass, setFadeClass] = useState<string>('fade');
    const start = () => {
        sendMessage();
        setIsReady(true);
    }
    useEffect(() => {
        if (isReady) {
            setFadeClass('fade fade-out');
        }
    }, [isReady]);

    return (
        <div className={`${fadeClass}`}>
            <Button onClick={start}>Get Ready</Button>
        </div>
    )
}