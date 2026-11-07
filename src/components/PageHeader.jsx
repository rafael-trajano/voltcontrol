import './PageHeader.css'

function PageHeader({ title, subtitle }) {
  return (
    <header className="page-header">
      <h1 className="page-header__title">
        <img src="/favicon.svg" alt="" className="page-title-icon" />
        {title}
      </h1>
      {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
    </header>
  )
}

export default PageHeader
