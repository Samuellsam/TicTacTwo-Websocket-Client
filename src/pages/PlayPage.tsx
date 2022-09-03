import { Button, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import Board from '../components/PlayPage/Board'
import TicTacToeButton from '../components/PlayPage/TicTacToeButton'
import {
  ID_COOKIE_FIELD,
  ROOM_CODE_COOKIE_FIELD,
  USERNAME_COOKIE_FIELD,
} from '../constants/CookieConstant'
import WebSocketContext from '../contexts/WebSocketContext'
import { TurnRequest } from '../entities/requests/TurnRequest'

const PlayPage: React.FC = () => {
  const navigate = useNavigate()
  const [cookies, setCookies, removeCookie] = useCookies([
    USERNAME_COOKIE_FIELD,
    ID_COOKIE_FIELD,
    ROOM_CODE_COOKIE_FIELD,
  ])
  const [socket, isConnected, rooms, game] = useContext(WebSocketContext)

  useEffect(() => {
    if (!game) {
      redirect('/')
    }
  }, [game?.board])

  const redirect = (path: string) => {
    navigate(path)
  }

  const isDisableBoard = () => {
    return game?.currentTurnUsername != cookies.username
  }

  const onTurn = (x: number, y: number) => {
    socket.emit('turn', {
      roomCode: cookies.roomCode,
      x,
      y,
    } as TurnRequest)
  }

  const renderBoard = () => {
    if (game && game.isFinished) {
      return (
        <>
          <Typography variant="h1" align="center">
            {game?.winner}'s winn!!!
          </Typography>
        </>
      )
    }

    return (
      <>
        <Typography>
          Your symbol is{' '}
          {game?.data.find((data) => data.username == cookies.username)?.symbol}
        </Typography>
        <Typography>
          {game?.currentTurnUsername == cookies.username
            ? 'Your'
            : game?.currentTurnUsername + "'s"}{' '}
          turn
        </Typography>
        <Board
          onSelectedCell={onTurn}
          disable={isDisableBoard()}
          coordinates={game?.board ?? []}
        />
      </>
    )
  }

  const leaveGame = () => {
    socket.emit('leave-game', cookies.roomCode)
    socket.emit('leave-member', cookies.username)
    socket.emit('leave-master', cookies.username)
    redirect('/')
  }

  return (
    <div>
      <Button variant="contained" size="large" onClick={leaveGame}>
        Leave
      </Button>
      {renderBoard()}
    </div>
  )
}

export default PlayPage
