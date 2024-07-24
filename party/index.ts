import generateWord from "@/utils/generateWord";
import * as Party from "partykit/server";

export default class Server implements Party.Server {
  private clientStates: Map<string, { progress: number; position: number | null }> = new Map();
  private finishedClients: string[] = [];

  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
        `Connected:
            id: ${conn.id}
            room: ${this.room.id}
            url: ${new URL(ctx.request.url).pathname}`
    );

    conn.send(JSON.stringify({type: "userId", userId: conn.id}));

    this.clientStates.set(conn.id, { progress: 0, position: null });
    
    const playerCount = [...this.room.getConnections()].length;
    const players: string[] = [];
    for (const partyConnection of this.room.getConnections()) {
      players.push(partyConnection.id);
    };

    this.room.broadcast(
      JSON.stringify({
        type: "updateConnection",
        connectionCount: playerCount,
        clients: players,
        userId: conn.id
      })
    );
  }

  onClose(connection: Party.Connection) {
    this.room.broadcast(JSON.stringify({type: "disconnect", message: `So sad! ${connection.id} left the party!`}));

    this.clientStates.delete(connection.id);
    this.finishedClients = this.finishedClients.filter(id => id !== connection.id);

    const playerCount = [...this.room.getConnections()].length;
    const players: string[] = [];
    for (const partyConnection of this.room.getConnections()) {
      players.push(partyConnection.id);
    };

    this.room.broadcast(
      JSON.stringify({
        type: "clientDisconnect",
        connectionCount: playerCount,
        clients: players,
      })
    );
  }

  onMessage(message: string, sender: Party.Connection) {
    console.log(`connection ${sender.id} sent message: ${message}`);
    // as well as broadcast it to all the other connections in the room...
    // this.room.broadcast(
    //   JSON.stringify({ sender: sender.id, message }),
    //   //[sender.id] // Exclude the sender from the broadcast
    // );
    const receivedMessage = JSON.parse(message);
    if (receivedMessage.type === "startGame") {
      // Reset game state
      this.clientStates.forEach((state, id) => {
        state.progress = 0;
        state.position = null;
      });
      this.finishedClients = [];

      this.room.broadcast(
        JSON.stringify({type: "raceCountdown", message: generateWord(1)}),
      );
    } else if (receivedMessage.type === "progressUpdate") {
      const clientState = this.clientStates.get(sender.id);
      if (clientState) {
        clientState.progress = receivedMessage.clientProgress;
        this.broadcastGameState();
      }
    } else if (receivedMessage.type === "completeGame") {
      const clientState = this.clientStates.get(sender.id);
      if (clientState && !this.finishedClients.includes(sender.id)) {
        clientState.progress = 100;
        clientState.position = this.finishedClients.length + 1;
        this.finishedClients.push(sender.id);
        this.broadcastGameState();

        // Check if all users have completed
        if (this.checkAllUsersComplete()) {
          this.room.broadcast(
            JSON.stringify({
              type: "allUsersComplete",
              message: "All users have completed the game!"
            })
          );
        }
      }
    } else if (receivedMessage.type === "resetGame") {
      this.resetGameState();
      this.room.broadcast(JSON.stringify({ type: "gameReset", message: "Game has been reset!" }));
    };
  }
  private broadcastGameState() {
    const gameState = Array.from(this.clientStates.entries()).map(([id, state]) => ({
      id,
      progress: state.progress,
      position: state.position
    }));

    this.room.broadcast(
      JSON.stringify({
        type: "gameStateUpdate",
        gameState
      })
    );
  }

  private checkAllUsersComplete() {
    const totalClients = [...this.room.getConnections()].length;
    const completedClients = this.finishedClients.length;
    return totalClients === completedClients;
  }

  private resetGameState() {
    // Reset all client states
    this.clientStates.forEach((state) => {
      state.progress = 0;
      state.position = null;
    });
    // Clear the finishedClients array
    this.finishedClients = [];
    // Broadcast the reset game state
    this.broadcastGameState();
  }
}

Server satisfies Party.Worker;
