import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type ReadyButtonProps = {
    isReady: boolean;
    sendMessage: () => void;
}

export default function ReadyButton({isReady, sendMessage} : ReadyButtonProps) {
    // const [isReady, setIsReady] = useState<boolean>(false);
    const [fadeClass, setFadeClass] = useState<string>('fade');
    const start = () => {
        sendMessage();
        // setIsReady(true);
    }
    useEffect(() => {
        if (isReady) {
            setFadeClass('fade fade-out');
        } else {
            setFadeClass('fade');
        }
    }, [isReady]);

    return (
        <div className={`${fadeClass}`}>
            <Button onClick={start}>Get Ready</Button>
        </div>
    )
}