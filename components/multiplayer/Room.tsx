"use client";

import RoomSocket from "@/components/multiplayer/RoomSocket";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Room() {
    const pathname = usePathname();
    const [roomId, setRoomId] = useState<string | null>(null);

    useEffect(() => {
        if (pathname) {
            const urlSplit = pathname.split("/");
            const id = urlSplit[urlSplit.length - 1];
            setRoomId(id);
        }
    }, [pathname]);

    if (!roomId) {
        return <div>Loading...</div>;
    };

    return (
        <RoomSocket roomId={roomId} />
    );

}
