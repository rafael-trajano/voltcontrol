import Card from '../Card'
import Button from '../Button'
import { formatBRL, formatMonth } from '../../utils/calculations'

function ConsumptionCard({ record, onEdit }) {
  return (
    <Card title="Dados de Consumo" className="dashboard__card-data">
      <div className="data-item">
        <span className="data-item__label">Meta de gasto mensal</span>
        <span className="data-item__value data-item__value--primary">
          {formatBRL(record.goalValue)}
        </span>
      </div>
      <div className="data-item">
        <span className="data-item__label">Valor da conta</span>
        <span className="data-item__value">{formatBRL(record.lastBillValue)}</span>
      </div>
      <div className="data-item">
        <span className="data-item__label">Consumo</span>
        <span className="data-item__value">{record.lastKwh} kWh</span>
      </div>
      <div className="data-item">
        <span className="data-item__label">Tarifa do kWh</span>
        <span className="data-item__value">{formatBRL(record.kwhRate)}</span>
      </div>
      <div className="data-item">
        <span className="data-item__label">Mês de referência</span>
        <span className="data-item__value">{formatMonth(record.billMonth)}</span>
      </div>
      <Button variant="primary" fullWidth onClick={onEdit} className="btn--sm dashboard__edit-button">
        Editar Dados
      </Button>
    </Card>
  )
}

export default ConsumptionCard
