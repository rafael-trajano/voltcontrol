import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import EnergyProvider from './context/EnergyContext.jsx'
import App from './App.jsx'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <EnergyProvider>
        <App />
      </EnergyProvider>
    </BrowserRouter>
  </StrictMode>,
)
