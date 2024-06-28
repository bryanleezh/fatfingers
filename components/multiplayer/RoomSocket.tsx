import usePartySocket from "partysocket/react";
import { useEffect, useRef, useState } from "react";
import MainMultiplayer from "./MainMultiplayer";
import { Button } from "../ui/button";
import generateWord from "@/utils/generateWord";
import RaceProgressBar from "./RaceProgressBar";
import { useGameStateStore } from "@/store/gameState";
import CountDown from "./CountDown";


type RoomSocketProps = {
    roomId: string,
};

type TotalProgressState = {
    racers: {
        name: string;
        isUser: boolean;
        progress: number;
        position?: number;
  }[];
}

export default function RoomSocket( {roomId} : RoomSocketProps ) {
    const gameStart = useGameStateStore((state) => state.gameStart);
    const setGameStart = useGameStateStore((state) => state.setGameStart);
    const countDown = useGameStateStore((state) => state.countDown);
    const setCountDown = useGameStateStore((state) => state.setCountDown);
    const [para, setPara] = useState<string>(generateWord(30));
    const [userId, setUserId] = useState<string | null>(null);
    const [connectionCount, setConnectionCount] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [totalProgress, setTotalProgess] = useState<TotalProgressState>({ racers: [] });
    const mockProgress = [
        { name: "Bryan", isUser: true, progress: 30 },
        { name: "You", isUser: false, progress: 80 },
        { name: "Me", isUser: false, progress: 100, position: 1 },
    ];

    const handleProgress = (progress: number) => {
        setProgress(progress);
    };

    const createTotalProgress = (clients: string[], userId: string) => {
        const newRacers = clients.map(client => ({
            name: client,
            isUser: client === userId,
            progress: 0
        }));

        setTotalProgess({ racers: newRacers });
    };

    const updateTotalProgress = (client: string, newProgress: number) => {
        setTotalProgess(prevState => ({
            racers: prevState.racers.map(racer =>
                racer.name === client ? { ...racer, progress: newProgress } : racer
            )
        }));
    };

    const startGame = () => {
        console.log("game start");
        setCountDown(false);
        setGameStart(true);
    };

    //  TODO: Reset entire party state tp allow for play again function
    const resetGame = () => {

    };

    const ws = usePartySocket({
        host: "localhost:1999", // or your PartyKit server URL
        room: roomId,
        onOpen() {
            console.log(`connected to room ${roomId}`);
        },
        // TODO: Add message type that logs client joins room
        onMessage(e) {
            try {
                const receivedMessage = JSON.parse(e.data);
                console.log(`room ${roomId} message`, receivedMessage);
                if (receivedMessage.type === "userId") {
                    setUserId(receivedMessage.userId);
                } else if (receivedMessage.type === "updateConnection") {
                    setConnectionCount(receivedMessage.connectionCount);
                    if (userId) createTotalProgress(receivedMessage.clients, userId);
                } else if (receivedMessage.type === "clientDisconnect") {
                    setConnectionCount(receivedMessage.connectionCount);
                    if (userId) createTotalProgress(receivedMessage.clients, userId);
                } else if (receivedMessage.type === "raceCountdown") {
                    setPara(receivedMessage.message);
                    setCountDown(true);
                } else if (receivedMessage.type === "progressUpdate" ) {
                    updateTotalProgress(receivedMessage.client, receivedMessage.progress);
                }
            } catch (err) {
                console.error("Failed to parse message", err);
            }
        },
        onClose() {
            console.log(`disconnected from room ${roomId}`);
        },
        onError(e) {
            console.log(`room ${roomId} error`, e);
        }
    });

    // * Periodically sends over progress of client to partykit server
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (gameStart && ws) {
            intervalRef.current = setInterval(() => {
                ws.send(JSON.stringify({ type: "progressUpdate", clientProgress: progress }));
            }, 1500);
        } else if (!gameStart && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [gameStart, progress, ws]);

    const sendMessage = () => {
        if (ws) {
            ws.send(JSON.stringify({type: "startGame", message: "start race"}));
        }
    };

    return (
        <div className="flex flex-col gap-4 w-3/4 flex-grow items-center justify-center">
            <p>Connected to room: {roomId}</p>
            <p>Players in room: {connectionCount}</p>
            <p>Client Id: {userId}</p>
            {/* TODO: Fade button away upon Countdown set to true */}
            <Button onClick={sendMessage}>Get Ready</Button>
            <CountDown countDown={countDown} onTimeUp={startGame} />
            <RaceProgressBar racers={totalProgress.racers} />
            <MainMultiplayer para={para} onProgress={handleProgress} />
        </div>
    );

}