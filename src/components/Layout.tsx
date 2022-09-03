import { Typography } from '@mui/material'
import { connect } from 'http2'
import { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import WebSocketContext from '../contexts/WebSocketContext'

type Props = {
  children?: React.ReactNode
}

const Layout: React.FC = (props: Props) => {
  const [socket, isConnected, rooms] = useContext(WebSocketContext)

  const getWebsocketStatus = () => {
    if (isConnected) {
      return <span>&#128519;</span>
    }

    return <span>&#128552;</span>
  }

  return (
    <>
      <p>ws-status: {getWebsocketStatus()}</p>
      <Outlet />
    </>
  )
}

export default Layout
