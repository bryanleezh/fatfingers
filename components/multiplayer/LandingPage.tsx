"use client";

import { Link } from "next-view-transitions"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react";

export default function LandingPage() {
  const [roomId, setRoomId] = useState<string>("");

  const joinRoom = () => {
    console.log("join room", roomId);
  };

  return (
    <section className="flex flex-col gap-4 w-3/4 flex-grow items-center justify-center">
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Multiplayer Mayhem</h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Experience the ultimate multiplayer showdown in our latest game. Gather up to 3 friends and get ready for
            intense battles to see who is faster!
          </p>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="flex items-center space-x-2">
            <Input 
              type="text"
              placeholder="Enter room code" 
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Button onClick={joinRoom}>Join Room</Button>
          </div>
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Create Room
          </Link>
        </div>
      </div>
    </section>
  )
}