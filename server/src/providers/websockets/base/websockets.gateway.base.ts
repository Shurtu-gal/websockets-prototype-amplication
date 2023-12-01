import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({namespace: "/admin"})
export class WebsocketGatewayBase implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server!: Server;
  
  afterInit(server: Server) {
    Logger.log("Websocket server initialized!", "WebsocketGatewayBase")
  }

  handleConnection (client: any) {
    Logger.log("Client connected: " + client.id);
  }

  async sendNotification(payload: any) {
    this.server.emit("notification", payload);
    return "Notification sent to all clients!";
  }

  async sendNotificationToUser(userId: string, payload: any) {
    this.server.to(userId).emit("notification", payload);
  }

  @SubscribeMessage("notification")
  async onNotification(client: any, payload: any) {
    Logger.log("Recieved notification: " + payload);
    this.server.emit("notification", payload);
    return "Notification sent to all clients!";
  }
}