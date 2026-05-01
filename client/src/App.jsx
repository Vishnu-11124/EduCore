import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/student/Home'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
