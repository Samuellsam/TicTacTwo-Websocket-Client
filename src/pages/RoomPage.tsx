import { Grid, Typography } from '@mui/material'
import CenteredLayout from '../components/CenteredLayout'
import RoomOption from '../components/RoomPage/RoomOption'
import { io } from 'socket.io-client'
import { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {
  ID_COOKIE_FIELD,
  ROOM_CODE_COOKIE_FIELD,
  USERNAME_COOKIE_FIELD,
} from '../constants/CookieConstant'
import WebSocketContext from '../contexts/WebSocketContext'
import { JoinLeaveRequest } from '../entities/requests/JoinLeaveRequest'
import { generateId } from '../utils/IdGenerator'
import { useNavigate } from 'react-router-dom'

const RoomPage: React.FC = () => {
  const navigate = useNavigate()
  const [cookies, setCookies, removeCookie] = useCookies([
    USERNAME_COOKIE_FIELD,
    ID_COOKIE_FIELD,
    ROOM_CODE_COOKIE_FIELD,
  ])
  const [roomCode, setRoomCode] = useState('')
  const [socket, isConnected, rooms] = useContext(WebSocketContext)

  const redirect = (path: string) => {
    navigate(path)
  }

  const handleOnCreateRoom = () => {
    setRoomCode(generateId(4, 3, 3).toUpperCase())
  }

  const handleOnJoinRoom = () => {
    redirect('/room/join')
  }

  useEffect(() => {
    if (cookies.roomCode) {
      socket.emit('leave-master', {
        roomCode: cookies.roomCode,
        username: cookies.username,
      } as JoinLeaveRequest)
      socket.emit('leave-member', {
        roomCode: cookies.roomCode,
        username: cookies.username,
      } as JoinLeaveRequest)
      removeCookie(ROOM_CODE_COOKIE_FIELD)
    }
  })

  useEffect(() => {
    if (roomCode) {
      setCookies(ROOM_CODE_COOKIE_FIELD, roomCode)
      socket.emit('join-master', {
        roomCode,
        username: cookies.username,
      } as JoinLeaveRequest)

      redirect('/room/lobby')
    }
  }, [roomCode])

  return (
    <CenteredLayout>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={4}>
          <Typography variant="h1">Choose your actions!</Typography>
        </Grid>
        <Grid item xs={3}>
          <RoomOption
            title="Create a room"
            description="Let's create a room, and start inviting your friend by sharing the code!"
            onClick={handleOnCreateRoom}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
          <RoomOption
            title="Join a room"
            description="What you waiting for? Ask your friend room code, join, and play now!"
            onClick={handleOnJoinRoom}
          />
        </Grid>
      </Grid>
    </CenteredLayout>
  )
}

export default RoomPage
