import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Skeleton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import generateHexCode from '../../utils/HexColorGenerator'
import { generateShortName } from '../../utils/ShortNameGenerator'

type Props = {
  username: string | undefined
}

const LobbyProfile: React.FC<Props> = (props: Props) => {
  const renderUserInfo = () => {
    if (props.username !== undefined) {
      return (
        <Box
          p={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Avatar
            sx={{
              width: '200px',
              height: '200px',
              bgcolor: generateHexCode(),
            }}
          >
            <Typography variant="h1">
              {generateShortName(props.username)}
            </Typography>
          </Avatar>
          <br />
          <Typography variant="h5">
            <b>{props.username}</b>
          </Typography>
        </Box>
      )
    }

    return (
      <Box
        p={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Skeleton
          variant="circular"
          sx={{
            width: '200px',
            height: '200px',
            bgcolor: generateHexCode(),
          }}
        ></Skeleton>
        <br />
        <Typography variant="h5">
          <b>Waiting...</b>
        </Typography>
      </Box>
    )
  }

  return <Card>{renderUserInfo()}</Card>
}

export default LobbyProfile
