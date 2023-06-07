/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, WsExceptionFilter } from "@nestjs/common";
import { WsException } from '@nestjs/websockets';


@Catch()
export class WebsocketExceptionFilter implements WsExceptionFilter {
    catch(_exception: WsException, host: ArgumentsHost) {
        const socket = host.switchToWs().getClient()
        socket.emit('exception', {
            status: 'ERROR!',
            message: 'Message is invalid'
        })
    }

}