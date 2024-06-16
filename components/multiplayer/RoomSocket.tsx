import usePartySocket from "partysocket/react";


type RoomSocketProps = {
    roomId: string,
}

export default function RoomSocket( {roomId} : RoomSocketProps ) {
    const ws = usePartySocket({
        host: "localhost:1999", // or your PartyKit server URL
        room: roomId, // roomId is guaranteed to be set here
        onOpen() {
            console.log(`connected to room ${roomId}`);
        },
        onMessage(e) {
            console.log(`room ${roomId} message`, e.data);
        },
        onClose() {
            console.log(`disconnected from room ${roomId}`);
        },
        onError(e) {
            console.log(`room ${roomId} error`, e);
        }
    });

    return <p>Connected to room: {roomId}</p>;
}