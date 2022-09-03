import {
  Alert,
  Button,
  Slide,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

type Props = {
  roomCode: string
}

const RoomCodeLayout: React.FC<Props> = (props: Props) => {
  const [roomCode, setRoomCode] = useState<string>(props.roomCode)
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  useEffect(() => {
    setRoomCode(props.roomCode)
  }, [props.roomCode])

  const onCopyRoomCodeClick = () => {
    navigator.clipboard.writeText(props.roomCode)
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
    <Box display="flex">
      <Typography variant="h3">Your Room Code is</Typography>
      &nbsp; &nbsp; &nbsp;
      <Tooltip title="Click to copy" placement="right">
        <Button
          size="large"
          variant="outlined"
          endIcon={<ContentCopyIcon />}
          onClick={onCopyRoomCodeClick}
        >
          <Typography variant="h5">{`#${roomCode}`}</Typography>
        </Button>
      </Tooltip>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Room Code Copied!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default RoomCodeLayout
