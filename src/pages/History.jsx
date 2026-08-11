import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHistoryData } from '../hooks/useHistoryData'
import { formatBRL, formatMonth } from '../utils/calculations'
import { HISTORY_TABLE_HEADERS, APP_FOOTER } from '../constants/ui'
import Button from '../components/Button'
import ConfirmModal from '../components/ConfirmModal'
import PageHeader from '../components/PageHeader'
import './History.css'
import { generateHistoryPdf } from '../services/pdf'

function History() {
  const navigate = useNavigate()
  const {
    history,
    totalKwh,
    monthlyAverage,
    monthCount,
    deleteFromHistory,
    getRecordEconomyPercent,
    getEconomyBadgeClass,
    getEconomyLabel,
    buildPdfRows,
  } = useHistoryData()

  const [recordToDelete, setRecordToDelete] = useState(null)

  function handleDeleteRequest(e, recordId) {
    e.stopPropagation()
    setRecordToDelete(recordId)
  }

  function handleDeleteConfirm() {
    deleteFromHistory(recordToDelete)
    setRecordToDelete(null)
  }

  function handleDeleteCancel() {
    setRecordToDelete(null)
  }

  function handleExportPDF() {
  generateHistoryPdf({
    monthlyAverage,
    totalKwh,
    history,
    buildPdfRows,
  })
}
  

  return (
    <div className="history">
      <PageHeader
        title="Histórico de Consumo"
        subtitle="Acompanhe a evolução do seu consumo de energia mês a mês e identifique tendências."
      />

      <div className="history__metrics">
        <div className="metric-card metric-card--blue">
          <span className="metric-card__label">Média Mensal</span>
          <span className="metric-card__value">{formatBRL(monthlyAverage)}</span>
        </div>
        <div className="metric-card metric-card--green">
          <span className="metric-card__label">Consumo Total Acumulado</span>
          <span className="metric-card__value">{totalKwh} kWh</span>
        </div>
        <div className="metric-card metric-card--orange">
          <span className="metric-card__label">Meses Registrados</span>
          <span className="metric-card__value">{monthCount}</span>
        </div>
      </div>

      <div className="history__table-wrapper">
        <table className="history__table">
          <thead>
            <tr>
              {HISTORY_TABLE_HEADERS.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td
                  colSpan={HISTORY_TABLE_HEADERS.length}
                  className="history__empty"
                >
                  Nenhum registro ainda. Adicione sua primeira conta!
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const economyPercent = getRecordEconomyPercent(record)
                return (
                  <tr
                    key={record.id}
                    className="history__row--clickable"
                    onClick={() => navigate(`/dashboard/${record.id}`)}
                  >
                    <td>{formatMonth(record.billMonth)}</td>
                    <td>{formatBRL(record.lastBillValue)}</td>
                    <td>{record.lastKwh} kWh</td>
                    <td>{formatBRL(record.goalValue)}</td>
                    <td>
                      <span className={`economy-badge ${getEconomyBadgeClass(economyPercent)}`}>
                        {getEconomyLabel(economyPercent)}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="outline"
                        onClick={(e) => handleDeleteRequest(e, record.id)}
                      >
                        Excluir
                      </Button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="history__actions">
        <Button variant="primary" onClick={handleExportPDF}>
          Exportar Histórico (PDF)
        </Button>
      </div>

      <footer className="history__footer">{APP_FOOTER}</footer>

      {recordToDelete && (
        <ConfirmModal
          message="Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita."
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  )
}

export default History
