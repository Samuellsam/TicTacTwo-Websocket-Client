import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import {
  ID_COOKIE_FIELD,
  USERNAME_COOKIE_FIELD,
} from '../../constants/CookieConstant'

type Props = {
  open: boolean
  onCloseClick: (username: string | undefined, isSave: boolean) => void
}

const UserInfoDialog: React.FC<Props> = (props: Props) => {
  const [cookies, setCookie] = useCookies([
    USERNAME_COOKIE_FIELD,
    ID_COOKIE_FIELD,
  ])
  const [username, setUsername] = useState<string>(cookies.username)

  useEffect(() => {
    if (props.open) {
      setUsername(cookies.username)
    }
  }, [props.open])

  const handleClose = (
    username: string | undefined,
    isSave: boolean = true
  ) => {
    props.onCloseClick(username, isSave)
  }

  const onUsernameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.length < 11) {
      setUsername(e.target.value)
    }
  }

  return (
    <Dialog open={props.open}>
      <DialogTitle>Player Information</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Username"
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => onUsernameChange(e)}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(username, false)}>Cancel</Button>
        <Button onClick={() => handleClose(username)}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserInfoDialog
