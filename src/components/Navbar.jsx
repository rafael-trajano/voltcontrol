import { NavLink } from 'react-router-dom'
import PageIcon from './PageIcon'
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
          aria-label="Adicionar Conta"
          className={({ isActive }) => `navbar__item ${isActive ? 'navbar__item--active' : ''}`}
        >
          <PageIcon name="add" size={22} className="navbar__icon" />
          <span className="navbar__label">Adicionar Conta</span>
        </NavLink>
        <NavLink
          to="/dashboard"
          aria-label="Dashboard"
          className={({ isActive }) => `navbar__item ${isActive ? 'navbar__item--active' : ''}`}
        >
          <PageIcon name="dashboard" size={22} className="navbar__icon" />
          <span className="navbar__label">Dashboard</span>
        </NavLink>
        <NavLink
          to="/history"
          aria-label="Histórico"
          className={({ isActive }) => `navbar__item ${isActive ? 'navbar__item--active' : ''}`}
        >
          <PageIcon name="history" size={22} className="navbar__icon" />
          <span className="navbar__label">Histórico</span>
        </NavLink>
        <NavLink
          to="/analysis"
          aria-label="Análise"
          className={({ isActive }) => `navbar__item ${isActive ? 'navbar__item--active' : ''}`}
        >
          <PageIcon name="analysis" size={22} className="navbar__icon" />
          <span className="navbar__label">Análise</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Navbar
