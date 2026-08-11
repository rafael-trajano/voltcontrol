import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Questions from './pages/Questions'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import './App.css'

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-with-sidebar">
        <Routes>
          <Route path="/" element={<Navigate to="/questions" replace />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
