import Card from '../Card'
import SummaryRow from '../SummaryRow'
import { formatBRL } from '../../utils/calculations'

function GoalCard({ goalTotal, goalEnergy, actualTaxes, goalKwhLimit }) {
  return (
    <Card>
      <h4 className="summary-card__title summary-card__title--goal">
        Meta
      </h4>
      <SummaryRow label="Valor Total"       value={formatBRL(goalTotal)}   />
      <SummaryRow label="Custo com Energia" value={formatBRL(goalEnergy)}  />
      <SummaryRow label="Taxas e Impostos"  value={formatBRL(actualTaxes)} />
      <SummaryRow label="Limite em kWh"     value={`${goalKwhLimit} kWh`}  />
    </Card>
  )
}

export default GoalCard
