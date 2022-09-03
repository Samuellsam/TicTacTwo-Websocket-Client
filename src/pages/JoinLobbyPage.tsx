import {
  Alert,
  Button,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { useContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import CenteredLayout from '../components/CenteredLayout'
import {
  ID_COOKIE_FIELD,
  ROOM_CODE_COOKIE_FIELD,
  USERNAME_COOKIE_FIELD,
} from '../constants/CookieConstant'
import WebSocketContext from '../contexts/WebSocketContext'
import { JoinLeaveRequest } from '../entities/requests/JoinLeaveRequest'

const JoinLobbyPage: React.FC = () => {
  const navigate = useNavigate()
  const [cookies, setCookies, removeCookie] = useCookies([
    USERNAME_COOKIE_FIELD,
    ID_COOKIE_FIELD,
    ROOM_CODE_COOKIE_FIELD,
  ])
  const [roomCode, setRoomCode] = useState<string>('')
  const [socket, isConnected, rooms] = useContext(WebSocketContext)
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  useEffect(() => {
    console.log(rooms)
  }, [rooms])

  if (!socket) {
    return <></>
  }

  const redirect = (path: string) => {
    navigate(path)
  }

  const handleJoinRoom = () => {
    if (rooms.find((room) => room.roomId === roomCode)) {
      setCookies(ROOM_CODE_COOKIE_FIELD, roomCode)
      socket.emit('join-member', {
        roomCode,
        username: cookies.username,
      } as JoinLeaveRequest)
      redirect('/room/lobby')
    } else {
      showRoomDoesntExist()
    }
  }

  const showRoomDoesntExist = () => {
    clearTimeout(timeoutId) // Clear current timeout
    setShowSnackBar(true) // Set show snackbar true
    setTimeoutId(
      // Set timeout
      setTimeout(() => {
        setShowSnackBar(false)
      }, 3000)
    )
  }

  return (
    <CenteredLayout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '15%',
        }}
      >
        <Typography variant="h5">Enter room code</Typography>
        <br />
        <TextField
          autoFocus
          label="Room Code"
          fullWidth
          variant="filled"
          sx={{
            backgroundColor: 'white',
          }}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        ></TextField>
        <br />
        <Button fullWidth variant="contained" onClick={handleJoinRoom}>
          Join
        </Button>
      </Box>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Room doesn't exist
        </Alert>
      </Snackbar>
    </CenteredLayout>
  )
}

export default JoinLobbyPage
