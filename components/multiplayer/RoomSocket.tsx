import usePartySocket from "partysocket/react";
import { useState } from "react";
import MainMultiplayer from "./MainMultiplayer";
import { Button } from "../ui/button";


type RoomSocketProps = {
    roomId: string,
}

export default function RoomSocket( {roomId} : RoomSocketProps ) {
    const [para, setPara] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);

    const ws = usePartySocket({
        host: "localhost:1999", // or your PartyKit server URL
        room: roomId,
        onOpen() {
            console.log(`connected to room ${roomId}`);
        },
        // TODO: On message will send message to server that game can start, game will generate a para down to all clients connected and set para for each client
        onMessage(e) {
            try {
                const receivedMessage = JSON.parse(e.data);
                console.log(`room ${roomId} message`, receivedMessage);
                if (receivedMessage.type === "welcome") {
                    console.log(receivedMessage.message);
                } else {
                    console.log(receivedMessage);
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
            <MainMultiplayer para={para} progress={0} />
        </div>
    );

}