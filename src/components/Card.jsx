import './Card.css'

function Card({ title, children, variant = 'default', className = '' }) {
  return (
    <div className={`card card--${variant} ${className}`}>
      {title && <h3 className="card__title">{title}</h3>}
      <div className="card__body">
        {children}
      </div>
    </div>
  )
}

export default Card