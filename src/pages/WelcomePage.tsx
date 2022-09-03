import { Alert, Box, Button, Slide, Snackbar, Typography } from '@mui/material'
import CenteredLayout from '../components/CenteredLayout'
import UserInfoDialog from '../components/WelcomePage/UserInfoDialog'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import {
  ID_COOKIE_FIELD,
  USERNAME_COOKIE_FIELD,
} from '../constants/CookieConstant'
import { generateId } from '../utils/IdGenerator'
import { Games, Edit } from '@mui/icons-material'

const WelcomePage: React.FC = () => {
  const navigate = useNavigate()
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const [isChangeUsername, setIsChangeUsername] = useState<boolean>(false) // Needed for avoid redirect to room page when change username
  const [cookies, setCookie] = useCookies([
    USERNAME_COOKIE_FIELD,
    ID_COOKIE_FIELD,
  ])

  const redirect = (path: string) => {
    navigate(path)
  }

  const handlePlay = () => {
    if (cookies.username === '' || cookies.username === undefined) {
      // If username never been filled before, then dont show dialog
      setShowDialog(true)
    } else {
      redirect('/room') // If username has been filled, then when user click play just redirect to room page
    }
  }

  const handleChangeUsername = () => {
    setShowDialog(true)
    setIsChangeUsername(true)
  }

  const showSuccessChangeUsername = () => {
    clearTimeout(timeoutId) // Clear current timeout
    setShowSnackBar(true) // Set show snackbar true
    setTimeoutId(
      // Set timeout
      setTimeout(() => {
        setShowSnackBar(false)
      }, 3000)
    )
  }

  const onDialogClose = (username: string | undefined, isSave: boolean) => {
    if (isSave) {
      setCookie(USERNAME_COOKIE_FIELD, username) // If user is click save, then set username

      if (
        !isChangeUsername &&
        (cookies.id === 'undefined' ||
          cookies.id === '' ||
          cookies.id === undefined)
      ) {
        setCookie(ID_COOKIE_FIELD, generateId(3, 2, 2)) // Generate ID when user first time input username
      }

      if (!isChangeUsername) {
        redirect('/room') // Redirect to room when user click play
      } else {
        showSuccessChangeUsername()
      }
    }

    if (isChangeUsername) {
      // Reset is change username only if its true
      setIsChangeUsername(false)
    }

    setShowDialog(false)
  }

  const renderChangeUsernameBtn = () => {
    if (cookies.username !== '' && cookies.username !== undefined) {
      return (
        <Button
          variant="contained"
          size="large"
          endIcon={<Edit />}
          color="success"
          onClick={handleChangeUsername}
        >
          <Typography variant="h5">Change Username</Typography>
        </Button>
      )
    }

    return undefined
  }

  return (
    <CenteredLayout>
      <Box p={4} borderColor="indigo" border={10}>
        <Typography variant="h1" align="center">
          <b>
            TIC TAC <u>TWO</u>!
          </b>
        </Typography>
        <hr />
        <br />
        <Typography variant="h6" align="center" color="white">
          - A "REAL TIME" two player tic tac toe game! -
        </Typography>
        <br />
        <Box
          m={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<Games />}
            onClick={handlePlay}
          >
            <Typography variant="h5">Play Now</Typography>
          </Button>
          <br />
          {renderChangeUsernameBtn()}
        </Box>
      </Box>
      <UserInfoDialog open={showDialog} onCloseClick={onDialogClose} />
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Username successfully changed
        </Alert>
      </Snackbar>
    </CenteredLayout>
  )
}

export default WelcomePage
