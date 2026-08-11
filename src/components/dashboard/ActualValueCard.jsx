import Card from '../Card'
import SummaryRow from '../SummaryRow'
import { formatBRL } from '../../utils/calculations'

function ActualValueCard({ actualTotal, actualEnergy, actualTaxes, lastKwh }) {
  return (
    <Card>
      <h4 className="summary-card__title summary-card__title--primary">
        Valor Atual
      </h4>
      <SummaryRow label="Valor Total"       value={formatBRL(actualTotal)}  />
      <SummaryRow label="Custo com Energia" value={formatBRL(actualEnergy)} />
      <SummaryRow label="Taxas e Impostos"  value={formatBRL(actualTaxes)}  />
      <SummaryRow label="Consumo em kWh"    value={`${lastKwh} kWh`}        />
    </Card>
  )
}

export default ActualValueCard
