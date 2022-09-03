import React from 'react'
import { io, Socket } from 'socket.io-client'
import { GameDetail } from '../models/GameDetail'
import { RoomDetail } from '../models/RoomDetail'

export const socket = io(process.env.REACT_APP_WEBSOCKET_URL as string)

const WebSocketContext = React.createContext<
  [Socket, boolean, RoomDetail[], GameDetail | undefined]
>([socket, false, [], undefined])

export default WebSocketContext
