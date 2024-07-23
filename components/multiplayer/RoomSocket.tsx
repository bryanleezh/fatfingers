import usePartySocket from "partysocket/react";
import { useEffect, useRef, useState } from "react";
import MainMultiplayer from "./MainMultiplayer";
import generateWord from "@/utils/generateWord";
import RaceProgressBar from "./RaceProgressBar";
import { useGameStateStore } from "@/store/gameState";
import CountDown from "./popups/CountDown";
import ReadyButton from "./ReadyButton";
import GameComplete from "./popups/GameComplete";


type RoomSocketProps = {
    roomId: string,
};

type Racer = {
    name: string;
    isUser: boolean;
    progress: number;
    position?: number;
};

type TotalProgressState = {
    racers: Racer[];
};

export default function RoomSocket( {roomId} : RoomSocketProps ) {
    const gameStart = useGameStateStore((state) => state.gameStart);
    const setGameStart = useGameStateStore((state) => state.setGameStart);
    const [isReady, setIsReady] = useState<boolean>(false);
    const setCountDown = useGameStateStore((state) => state.setCountDown);
    const [para, setPara] = useState<string>(generateWord(30));
    const [userId, setUserId] = useState<string | null>(null);
    const [connectionCount, setConnectionCount] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const latestProgressRef = useRef(progress);
    const [totalProgress, setTotalProgess] = useState<TotalProgressState>({ racers: [] });
    const [allUsersComplete, setAllUsersComplete] = useState(false);

    const mockProgress = [
        { name: "Bryan", isUser: true, progress: 30 },
        { name: "You", isUser: false, progress: 80 },
        { name: "Me", isUser: false, progress: 100, position: 1 },
    ];

    const handleProgress = (newProgress: number) => {
        setProgress(newProgress);
        latestProgressRef.current = newProgress;
    };

    const createTotalProgress = (clients: string[], userId: string) => {
        const newRacers = clients.map(client => ({
            name: client,
            isUser: client === userId,
            progress: 0,
            position: undefined
        }));

        setTotalProgess({ racers: newRacers });
    };

    const startGame = () => {
        setCountDown(false);
        setGameStart(true);
    };

    const resetGameState = () => {
        setGameStart(false);
        setCountDown(false);
        setProgress(0);
        setAllUsersComplete(false);
        setIsReady(false);
    }

    const determinePosition = () => {
        const userRacer = totalProgress.racers.find(racer => racer.isUser);
        return userRacer?.position;
    }

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
                    setIsReady(true);
                    setTimeout(() => {
                        setCountDown(true);
                    }, 0);
                } else if (receivedMessage.type === "gameStateUpdate") {
                    setTotalProgess({
                        racers: receivedMessage.gameState.map((client: { id: string | null; progress: any; position: any; }) => ({
                            name: client.id,
                            isUser: client.id === userId,
                            progress: client.progress,
                            position: client.position
                        }))
                    });
                } else if (receivedMessage.type === "allUsersComplete") {
                    setAllUsersComplete(true);
                } else if (receivedMessage.type === "gameReset") {
                    // TODO: Reset game for everyone
                    resetGameState();
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
                ws.send(JSON.stringify({ type: "progressUpdate", clientProgress: latestProgressRef.current }));
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
    }, [gameStart, ws]);

    useEffect(() => {
        if (isReady) {
            setCountDown(true);
        }
    }, [isReady]);


    const sendMessage = () => {
        if (ws) {
            ws.send(JSON.stringify({type: "startGame", message: "start race"}));
        };
    };

    const handleComplete = () => {
        if (ws) {
            ws.send(JSON.stringify({type: "completeGame", message: "complete race"}));
            // prevent keyboard events after completion
            setGameStart(false);
        };
    };

    const resetGame = () => {
        console.log("reset game");
        if (ws) {
            ws.send(JSON.stringify({type: "resetGame"}));
        }
    };

    return (
        <div className="flex flex-col gap-4 w-3/4 flex-grow items-center justify-center">
            <p>Room Code (Share this code with your friends!):</p>
            <p>{roomId}</p>
            <p>Players in room: {connectionCount}</p>
            <p>Client Id: {userId}</p>
            <ReadyButton isReady={isReady} sendMessage={sendMessage} />
            <CountDown onTimeUp={startGame} />
            <GameComplete allUsersComplete={allUsersComplete} userPosition={determinePosition()} onReset={resetGame} />
            <RaceProgressBar racers={totalProgress.racers} />
            <MainMultiplayer para={para} onProgress={handleProgress} onGameComplete={handleComplete}/>
        </div>
    );

}