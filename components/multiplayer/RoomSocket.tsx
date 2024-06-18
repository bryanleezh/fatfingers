import usePartySocket from "partysocket/react";
import { useState } from "react";


type RoomSocketProps = {
    roomId: string,
}

export default function RoomSocket( {roomId} : RoomSocketProps ) {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    const ws = usePartySocket({
        host: "localhost:1999", // or your PartyKit server URL
        room: roomId,
        onOpen() {
            console.log(`connected to room ${roomId}`);
        },
        onMessage(e) {
            try {
                const receivedMessage = JSON.parse(e.data);
                console.log(`room ${roomId} message`, receivedMessage);
                if (receivedMessage.type === "welcome") {
                    console.log(receivedMessage.message);
                } else {
                    setMessages(prevMessages => [...prevMessages, `${receivedMessage.sender}: ${receivedMessage.message}`]);
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
            ws.send(JSON.stringify({ message }));
            setMessage(""); // Clear the input after sending the message
        }
    };

    return (
        <div>
            <p>Connected to room: {roomId}</p>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send Message</button>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );

}