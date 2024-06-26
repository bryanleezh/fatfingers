"use client";

import Room from "@/components/multiplayer/Room";

export default function MultiplayerRoom() {
    
    return (
        <main className="flex flex-col items-center py-4 px-12">
            <span id="hidden-measure" className="font-mono text-2xl break-all opacity-0 h-0">a</span>
            <Room />
        </main>
    )

}
