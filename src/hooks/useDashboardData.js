import { useParams } from 'react-router-dom'
import { useEnergy } from './useEnergy'
import {
  calcConsumptionData,
  calcEnergyEconomyPercent,
  getFeedbackStatus,
  getFeedbackMessage,
  getDicaText,
  getDicaColor,
} from '../utils/calculations'
import { FEEDBACK_CONFIG } from '../constants/feedback'

export function useDashboardData() {
  const { id } = useParams()
  const { energyData, history } = useEnergy()

  const selectedRecord = id
    ? history.find((record) => String(record.id) === id) || null
    : energyData

  if (!selectedRecord) return { selectedRecord: null }

  const consumptionData = calcConsumptionData(selectedRecord)
  const { actualEnergy, goalEnergy } = consumptionData

  const economyPercent = calcEnergyEconomyPercent(actualEnergy, goalEnergy)
  const status         = getFeedbackStatus(economyPercent)

  return {
    selectedRecord,
    consumptionData,
    economyPercent,
    status,
    feedback: FEEDBACK_CONFIG[status],
    feedbackMessage: getFeedbackMessage(economyPercent),
    dicaText: getDicaText(status),
    dicaColor: getDicaColor(status),
    isHistoryView: Boolean(id),
  }
}
