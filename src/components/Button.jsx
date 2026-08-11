import './Button.css'

function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  fullWidth = false,
  className = '',
  style,
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
