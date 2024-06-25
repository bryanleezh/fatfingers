import usePartySocket from "partysocket/react";
import { useEffect, useState } from "react";
import MainMultiplayer from "./MainMultiplayer";
import { Button } from "../ui/button";
import generateWord from "@/utils/generateWord";
import RaceProgressBar from "./RaceProgressBar";
import { useGameStateStore } from "@/store/gameState";


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

    const [para, setPara] = useState<string>(generateWord(30));
    const [connectionCount, setConnectionCount] = useState<number>(0);
    const [connectedClients, setConnectedClients] = useState<string[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [totalProgress, setTotalProgess] = useState<TotalProgressState>({ racers: [] });
    const [userId, setUserId] = useState<string | null>(null);
    const mockProgress = [
        { name: "Bryan", isUser: true, progress: 30 },
        { name: "You", isUser: false, progress: 80 },
        { name: "Me", isUser: false, progress: 100, position: 1 },
    ];

    const handleProgress = (progress: number) => {
        setProgress(progress);
    };

    const updateTotalProgress = (clients: string[], userId: string) => {
        const newRacers = clients.map(client => ({
            name: client,
            isUser: client === userId,
            progress: 0
        }));
        setTotalProgess({ racers: newRacers });
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
                    setConnectedClients(receivedMessage.clients);
                    updateTotalProgress(receivedMessage.clients, receivedMessage.userId);
                } else if (receivedMessage.type === "clientDisconnect") {
                    setConnectionCount(receivedMessage.connectionCount);
                    setConnectedClients(receivedMessage.clients);
                    if (userId) updateTotalProgress(receivedMessage.clients, userId);
                } else if (receivedMessage.type === "raceCountdown") {
                    setPara(receivedMessage.message);
                    // TODO: Start countdown
                } else if (receivedMessage.type === "progressUpdate" ) {
                    setTotalProgess(receivedMessage.message);
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
    useEffect(() => {
        const interval = setInterval(() => {
            if (gameStart && ws) {
                ws.send(JSON.stringify({ type: "progressUpdate", clientProgress: progress }));
            }
        }, 3000); // Send every 3 seconds
        return () => clearInterval(interval);
    }, [ws, progress, gameStart]);

    const sendMessage = () => {
        if (ws) {
            ws.send(JSON.stringify({type: "startGame", message: "start race"}));
        }
    };

    return (
        <div className="flex flex-col gap-4 w-3/4 flex-grow items-center justify-center">
            <p>Connected to room: {roomId}</p>
            <p>Players in room: {connectionCount}</p>
            {/* <p>Connected clients:</p>
            <ul>
                {connectedClients.map((client) => (
                    <li key={client}>{client}</li>
                ))}
            </ul> */}
            <Button onClick={sendMessage}>Get Ready</Button>
            <RaceProgressBar racers={totalProgress.racers} />
            <MainMultiplayer para={para} onProgress={handleProgress} />
        </div>
    );

}