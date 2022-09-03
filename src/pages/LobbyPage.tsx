import { Box, Button, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import CenteredLayout from '../components/CenteredLayout'
import LobbyProfile from '../components/LobbyPage/LobbyProfile'
import RoomCodeLayout from '../components/LobbyPage/RoomCodeLayout'
import {
  ID_COOKIE_FIELD,
  ROOM_CODE_COOKIE_FIELD,
  USERNAME_COOKIE_FIELD,
} from '../constants/CookieConstant'
import WebSocketContext from '../contexts/WebSocketContext'

const LobbyPage: React.FC = () => {
  const navigate = useNavigate()
  const [cookies, setCookies, removeCookie] = useCookies([
    USERNAME_COOKIE_FIELD,
    ID_COOKIE_FIELD,
    ROOM_CODE_COOKIE_FIELD,
  ])
  const [socket, isConnected, rooms, game] = useContext(WebSocketContext)

  useEffect(() => {
    if (game && !game?.isFinished) {
      redirect('/room/play')
    }
  }, [game?.isFinished])

  const redirect = (path: string) => {
    navigate(path)
  }

  const handleStartGame = () => {
    socket.emit('start-game', cookies.roomCode)
  }

  const renderStartBtn = () => {
    const masterUsername = rooms.find(
      (room) => room.roomId === cookies.roomCode
    )?.users.master

    if (masterUsername == cookies.username) {
      return (
        <Button variant="outlined" onClick={handleStartGame}>
          <Typography variant="h5">Start</Typography>
        </Button>
      )
    }

    return <></>
  }

  return (
    <CenteredLayout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '75%',
        }}
      >
        <RoomCodeLayout roomCode={cookies.roomCode} />
        <Box sx={{ height: '50px' }}></Box>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={2}>
            <LobbyProfile
              username={
                rooms.find((room) => room.roomId == cookies.roomCode)?.users
                  .master
              }
            />
          </Grid>
          <Grid
            item
            xs={2}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            <Typography variant="h2">
              <b>VS</b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <LobbyProfile
              username={
                rooms.find((room) => room.roomId == cookies.roomCode)?.users
                  .members[0]
              }
            />
          </Grid>
        </Grid>
        <Box sx={{ height: '20px' }}></Box>
        {renderStartBtn()}
      </Box>
    </CenteredLayout>
  )
}

export default LobbyPage
