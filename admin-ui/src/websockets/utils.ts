import { io, Socket } from 'socket.io-client';

export const createWebsocket = (url: string): Socket => {
  return io(url, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: Infinity,
  });
}