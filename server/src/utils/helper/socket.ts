import { Server } from "socket.io";

let io: Server;

const socket = {
  //* initializing the socket to serve
  init: (httpServer: any) => {
    io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OTHER"],
      },
    });
    return io;
  },
  //* getting the socket if the socket is initialized.
  getIo: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    } else {
      return io;
    }
  },
};

export default socket;
