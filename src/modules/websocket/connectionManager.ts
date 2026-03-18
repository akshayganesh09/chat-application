import WebSocket from "ws";

const connections = new Map<string, WebSocket>();

export const addConnection = (userId: string, socket: WebSocket) => {
  console.log("Socket: ", socket);
  connections.set(userId, socket);
};

export const removeConnection = (userId: string) => {
  connections.delete(userId);
};

export const getConnection = (userId: string) => {
  return connections.get(userId);
};

export const getAllConnectedUser = () => {
  return Array.from(connections.keys());
};

export const sendToUser = (userId: string, data: any) => {
  const socket = connections.get(userId);

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
};
