import usePartySocket from "partysocket/react";
import { useState } from "react";
import MainMultiplayer from "./MainMultiplayer";
import { Button } from "../ui/button";
import generateWord from "@/utils/generateWord";
import RaceProgressBar from "./RaceProgressBar";


type RoomSocketProps = {
    roomId: string,
};

export default function RoomSocket( {roomId} : RoomSocketProps ) {
    const [para, setPara] = useState<string>(generateWord(30));
    const [progress, setProgress] = useState<number>(0);
    // const totalprogress = useState<[]>();
    const totalprogress = [
        { name: "Bryan", progress: 30 },
        { name: "You", progress: 80 },
        { name: "Me", progress: 90 },
    ];

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
                if (receivedMessage.type === "welcome") {
                    console.log(receivedMessage.message);
                } else {
                    setPara(receivedMessage.message);
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

    const sendMessage = () => {
        if (ws) {
            ws.send(JSON.stringify("start game"));
        }
    };


    return (
        <div className="flex flex-col gap-4 w-3/4 flex-grow items-center justify-center">
            <p>Connected to room: {roomId}</p>
            <Button onClick={sendMessage}>Get Ready</Button>
            <RaceProgressBar racers={totalprogress} />
            <MainMultiplayer para={para} progress={0} />
        </div>
    );

}