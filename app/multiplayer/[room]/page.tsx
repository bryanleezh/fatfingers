"use client";

import usePartySocket from "partysocket/react";

export default function MultiplayerRoom() {
    const ws = usePartySocket({
    // usePartySocket takes the same arguments as PartySocket.
    host: "localhost:1999", // or localhost:1999 in dev
    room: "my-room",

    // in addition, you can provide socket lifecycle event handlers
    // (equivalent to using ws.addEventListener in an effect hook)
    onOpen() {
      console.log("connected");
    },
    onMessage(e) {
      console.log("message", e.data);
    },
    onClose() {
      console.log("closed");
    },
    onError(e) {
      console.log("error");
    }
  });
}
