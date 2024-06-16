"use client";

import RoomSocket from "@/components/multiplayer/RoomSocket";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MultiplayerRoom() {
    const pathname = usePathname();
    const [roomId, setRoomId] = useState<string | null>(null);

    useEffect(() => {
        if (pathname) {
            const urlSplit = pathname.split("/");
            const id = urlSplit[urlSplit.length - 1];
            console.log(id);
            setRoomId(id);
        }
    }, [pathname]);

    if (!roomId) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <RoomSocket roomId={roomId} />
            {/* Other UI components */}
        </div>
    );

}
