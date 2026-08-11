import { useNavigate } from 'react-router-dom'
import { formatMonth } from '../utils/calculations'
import { useDashboardData } from '../hooks/useDashboardData'
import { APP_FOOTER } from '../constants/ui'
import Button from '../components/Button'
import Chart from '../components/Chart'
import PageHeader from '../components/PageHeader'
import FeedbackCard from '../components/dashboard/FeedbackCard'
import ConsumptionCard from '../components/dashboard/ConsumptionCard'
import ActualValueCard from '../components/dashboard/ActualValueCard'
import GoalCard from '../components/dashboard/GoalCard'
import TipCard from '../components/dashboard/TipCard'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const {
    selectedRecord,
    consumptionData,
    feedback,
    feedbackMessage,
    dicaText,
    dicaColor,
    isHistoryView,
  } = useDashboardData()

  if (!selectedRecord) {
    return (
      <div className="dashboard">
        <PageHeader
          title="Monitoramento de Consumo"
          subtitle="Nenhum dado encontrado. Adicione sua primeira conta para começar."
        />
        <Button
          variant="primary"
          onClick={() => navigate('/questions')}
          style={{ marginTop: 24, maxWidth: 220 }}
        >
          Adicionar Conta
        </Button>
        <footer className="dashboard__footer">{APP_FOOTER}</footer>
      </div>
    )
  }

  const { actualTotal, actualEnergy, actualTaxes, goalTotal, goalEnergy, goalKwhLimit } =
    consumptionData

  const pageTitle    = isHistoryView
    ? `Detalhes — ${formatMonth(selectedRecord.billMonth)}`
    : 'Monitoramento de Consumo'

  const pageSubtitle = isHistoryView
    ? `Acompanhe os dados de consumo referentes a ${formatMonth(selectedRecord.billMonth)}.`
    : 'Acompanhe seu consumo de energia e compare com sua meta mensal.'

  function handleEditData() {
    navigate('/questions', { state: { editingData: selectedRecord } })
  }

  return (
    <div className="dashboard">
      <PageHeader title={pageTitle} subtitle={pageSubtitle} />

      <div className="dashboard__grid">
        <ConsumptionCard record={selectedRecord} onEdit={handleEditData} />

        <div className="dashboard__right-col">
          <FeedbackCard feedback={feedback} message={feedbackMessage} />
          <Chart actualValue={actualTotal} goalValue={goalTotal} />
        </div>
      </div>

      <div className="dashboard__summary-grid">
        <ActualValueCard
          actualTotal={actualTotal}
          actualEnergy={actualEnergy}
          actualTaxes={actualTaxes}
          lastKwh={selectedRecord.lastKwh}
        />
        <GoalCard
          goalTotal={goalTotal}
          goalEnergy={goalEnergy}
          actualTaxes={actualTaxes}
          goalKwhLimit={goalKwhLimit}
        />
        <TipCard tipText={dicaText} titleColor={dicaColor} />
      </div>

      <footer className="dashboard__footer">{APP_FOOTER}</footer>
    </div>
  )
}

export default Dashboard
