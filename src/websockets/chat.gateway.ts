/* eslint-disable prettier/prettier */
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';
import { WebsocketExceptionFilter } from './ws-filter';

class ChatMessage {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

@WebSocketGateway()
@UsePipes(new ValidationPipe())
@UseFilters(new WebsocketExceptionFilter())
export class ChatGateway {
  @SubscribeMessage('text-chat')
  handleMessage(@MessageBody() message: ChatMessage) {
    try {
      console.log(message);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
