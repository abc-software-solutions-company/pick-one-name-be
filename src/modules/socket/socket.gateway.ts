import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { ICustomSocket } from './interfaces/socket.interface';

import { WebsocketGuard } from '../auth/guards/websocket.guard';
import { User } from '../users/entities/user.entity';

@WebSocketGateway({
  cors: {
    credentials: true,
    origin: ['*']
  }
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(_server: Server) {
    // console.log('Socket IO Initialized');
  }

  handleConnection(client: ICustomSocket) {
    console.log('Connected', client.id);
  }

  handleDisconnect(client: ICustomSocket) {
    console.log('Disconnected', client.id);
    this.server.emit('USERS_CHANGED', { user: 'client.user.email', event: 'left' });
  }

  @UseGuards(WebsocketGuard)
  @SubscribeMessage('JOIN_GAME_ROOM')
  async joinRoom(client: ICustomSocket, payload: { user: User; roomId: string }) {
    console.log('joinRoom', client.user);
    client.join(payload.roomId);
    client.broadcast.to(payload.roomId).emit('USERS_CHANGED', { user: 'client.user.email', event: 'joined' });
  }

  @UseGuards(WebsocketGuard)
  @SubscribeMessage('LEAVE_GAME_ROOM')
  async leaveChatRoom(client: ICustomSocket, payload: { user: User; roomId: string }) {
    client.broadcast.to(payload.roomId).emit('USERS_CHANGED', { user: 'client.user.email', event: 'left' });
    client.leave(payload.roomId);
  }
}
