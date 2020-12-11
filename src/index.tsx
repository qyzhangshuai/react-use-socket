import { createContext, FC, useContext } from "react";
import { io, Socket } from "socket.io-client";

const socket = io(
  process.env.SOCKET_URI ||
    process.env.NEXT_PUBLIC_SOCKET_URI ||
    "ws://localhost:443"
);
const socketContext = createContext(socket);

const SocketProvider: FC = ({ children }) => {
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};

const useSocket: () => Socket = () => useContext(socketContext);

export { useSocket, SocketProvider };
