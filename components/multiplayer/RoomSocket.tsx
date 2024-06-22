import usePartySocket from "partysocket/react";
import { useEffect, useState } from "react";
import MainMultiplayer from "./MainMultiplayer";
import { Button } from "../ui/button";
import generateWord from "@/utils/generateWord";
import RaceProgressBar from "./RaceProgressBar";


type RoomSocketProps = {
    roomId: string,
};

type TotalProgressState = {
    racers: {
    name: string;
    progress: number;
    position?: number;
  }[];
}

// TODO: Need to figure out own client ID to set progress to player
export default function RoomSocket( {roomId} : RoomSocketProps ) {
    const [para, setPara] = useState<string>(generateWord(30));
    const [connectionCount, setConnectionCount] = useState<number>(0);
    const [connectedClients, setConnectedClients] = useState<string[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [totalProgress, setTotalProgess] = useState<TotalProgressState>({ racers: [] });
    const mockProgress = [
        { name: "Bryan", progress: 30 },
        { name: "You", progress: 80 },
        { name: "Me", progress: 100, position: 1 },
    ];

    const handleProgress = (progress: number) => {
        setProgress(progress);
    };

    const ws = usePartySocket({
        host: "localhost:1999", // or your PartyKit server URL
        room: roomId,
        onOpen() {
            console.log(`connected to room ${roomId}`);
        },
        // TODO: Add logic for setting number of clients connected
        // TODO: Add message type that logs client joins room
        onMessage(e) {
            try {
                const receivedMessage = JSON.parse(e.data);
                console.log(`room ${roomId} message`, receivedMessage);
                if (receivedMessage.type === "updateConnection") {
                    setConnectionCount(receivedMessage.connectionCount);
                    setConnectedClients(receivedMessage.clients);
                    console.log(receivedMessage.clients)
                } else if (receivedMessage.type === "raceCountdown") {
                    setPara(receivedMessage.message);
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

    useEffect(() => {
        const handleBeforeUnload = () => {
        if (ws) {
            ws.close();
        }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [ws]);

    const sendMessage = () => {
        if (ws) {
            // ws.send(JSON.stringify("start game"));
            ws.send(JSON.stringify({type: "startGame", message: "start race"}));
        }
    };


    return (
        <div className="flex flex-col gap-4 w-3/4 flex-grow items-center justify-center">
            <p>Connected to room: {roomId}</p>
            <p>Connection Count: {connectionCount}</p>
            <p>Connected clients:</p>
            <ul>
                {connectedClients.map((client) => (
                    <li key={client}>{client}</li>
                ))}
            </ul>
            <Button onClick={sendMessage}>Get Ready</Button>
            <RaceProgressBar racers={mockProgress} />
            <MainMultiplayer para={para} onProgress={handleProgress} />
        </div>
    );

}