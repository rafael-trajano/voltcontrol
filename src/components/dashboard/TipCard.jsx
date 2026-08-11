import Card from '../Card'

function TipCard({ tipText, titleColor }) {
  return (
    <Card>
      <h4 className="summary-card__title" style={{ color: titleColor }}>
        Dica VoltControl
      </h4>
      <p className="dica__text">{tipText}</p>
    </Card>
  )
}

export default TipCard
