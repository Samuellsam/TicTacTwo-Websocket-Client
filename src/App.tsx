import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import WelcomePage from './pages/WelcomePage'
import RoomPage from './pages/RoomPage'
import LobbyPage from './pages/LobbyPage'
import JoinLobbyPage from './pages/JoinLobbyPage'
import PlayPage from './pages/PlayPage'
import WebSocketProvider from './providers/WebsocketProvider'

function App() {
  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />}></Route>
            <Route path="room">
              <Route index element={<RoomPage />}></Route>
              <Route path="lobby" element={<LobbyPage />}></Route>
              <Route path="join" element={<JoinLobbyPage />}></Route>
              <Route path="play" element={<PlayPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  )
}

export default App
