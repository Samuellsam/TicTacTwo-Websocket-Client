import React, { ReactNode, useEffect, useState } from 'react'
import { socket } from '../contexts/WebSocketContext'
import WebSocketContext from '../contexts/WebSocketContext'
import { RoomDetail } from '../models/RoomDetail'
import { GameDetail } from '../models/GameDetail'

type Props = {
  children: ReactNode
}

const WebSocketProvider: React.FC<Props> = (props: Props) => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [rooms, setRooms] = useState<RoomDetail[]>([])
  const [game, setGame] = useState<GameDetail>()

  socket.on('broadcast-rooms', (responseRooms) => {
    setRooms(responseRooms)
  })

  socket.on('broadcast-game', (responseGame) => {
    setGame(responseGame)
  })

  socket.on('connect', () => {
    setIsConnected(true)
  })

  socket.on('disconnect', () => {
    setIsConnected(false)
  })

  return (
    <WebSocketContext.Provider value={[socket, isConnected, rooms, game]}>
      {props.children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketProvider
