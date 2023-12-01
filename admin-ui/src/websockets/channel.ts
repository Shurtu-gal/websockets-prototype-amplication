import { eventChannel } from "redux-saga";
import { createWebsocket } from "./utils";
import { showNotification } from "react-admin";

export default function websocketInitChannel() {
  if(!process.env.REACT_APP_WEBSOCKET_URL) {
    throw new Error("REACT_APP_WEBSOCKET_URL is not set");
  }

  const url = process.env.REACT_APP_WEBSOCKET_URL;
  console.log("Connecting to websocket: ", url);
  const socket = createWebsocket(url);

  return {
    channel: eventChannel((emitter) => {
      socket.on("notification", (payload) => {
        console.log("Recieved notification: ", payload);
        emitter(showNotification(payload));
      });

      return () => {
        socket.close();
      };
    }),
    socket
  }
}