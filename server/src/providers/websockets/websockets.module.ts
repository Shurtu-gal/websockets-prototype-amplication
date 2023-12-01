import { Module } from "@nestjs/common";
import { WebSocketGateway } from "./websockets.gateway";

@Module({
  imports: [],
  exports: [WebSocketGateway],
  providers: [WebSocketGateway],
})
export class WebsocketsModule {}