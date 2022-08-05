import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import WelcomePage from './pages/WelcomePage'
import PlayPage from './pages/PlayPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />}></Route>
          <Route path="play" element={<PlayPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
