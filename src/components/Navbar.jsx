import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <aside className="navbar">
      <div className="navbar__logo">
        <div className="navbar__logo-text">VoltControl</div>
        <div className="navbar__logo-subtitle">Controle Inteligente de Energia</div>
      </div>

      <div className="navbar__divider" />

      <nav className="navbar__nav">
        <NavLink
          to="/questions"
          className={({ isActive }) => `navbar__item ${isActive ? 'navbar__item--active' : ''}`}
        >
          Adicionar Conta
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `navbar__item ${isActive ? 'navbar__item--active' : ''}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => `navbar__item ${isActive ? 'navbar__item--active' : ''}`}
        >
          Histórico
        </NavLink>
      </nav>
    </aside>
  )
}

export default Navbar
