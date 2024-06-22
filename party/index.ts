import generateWord from "@/utils/generateWord";
import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
        `Connected:
            id: ${conn.id}
            room: ${this.room.id}
            url: ${new URL(ctx.request.url).pathname}`
    );

    // Send a welcome message and the current number of connections to the new connection
    conn.send(
      JSON.stringify({ 
        type: "welcome", 
        message: "hello from server", 
      })
    );
    // Notify all connections about the updated connection count
    this.room.broadcast(
      JSON.stringify({ 
        type: "updateConnectionCount", 
      })
    );
    // let's send a message to the connection
    // conn.send(JSON.stringify({ type: "welcome", message: "hello from server" }));
  }

  onClose(connection: Party.Connection) {
    this.room.broadcast(JSON.stringify({type: "disconnect", message: `So sad! ${connection.id} left the party!`}))
  }

  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`);
    // as well as broadcast it to all the other connections in the room...
    // this.room.broadcast(
    //   JSON.stringify({ sender: sender.id, message }),
    //   //[sender.id] // Exclude the sender from the broadcast
    // );
    const receivedMessage = JSON.parse(message);
    if (receivedMessage.type === "startGame") {
      this.room.broadcast(
        JSON.stringify({type: "raceCountdown", message: generateWord(30)}),
      )
    } else if (receivedMessage.type === "progressUpdate") {
      // TODO: send progress update
    }
  }
}

Server satisfies Party.Worker;
