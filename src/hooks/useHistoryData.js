import { useEnergy } from './useEnergy'
import {
  calcEnergyEconomyPercent,
  getFeedbackStatus,
  formatBRL,
  formatMonth,
  calcConsumptionData,
} from '../utils/calculations'
import { ECONOMY_STATUS_CLASS } from '../constants/ui'


export function useHistoryData() {
  const { history, deleteFromHistory } = useEnergy()

  const totalKwh = history.reduce(
    (acc, record) => acc + Number(record.lastKwh),
    0
  )

  const monthlyAverage =
    history.length > 0
      ? history.reduce((acc, record) => acc + Number(record.lastBillValue), 0) /
        history.length
      : 0

  const monthCount = String(history.length).padStart(2, '0')

  function getRecordEconomyPercent(record) {
    const { actualEnergy, goalEnergy } = calcConsumptionData(record)
    return calcEnergyEconomyPercent(actualEnergy, goalEnergy)
  }

  function getEconomyBadgeClass(economyPercent) {
    const status = getFeedbackStatus(economyPercent)
    return ECONOMY_STATUS_CLASS[status]
  }

  function getEconomyLabel(economyPercent) {
    if (economyPercent <= 0) return `${Math.abs(economyPercent)}% abaixo`
    return `${economyPercent}% acima`
  }

  function buildPdfRows() {
    return history.map((record) => {
      const economyPercent = getRecordEconomyPercent(record)
      return [
        formatMonth(record.billMonth),
        formatBRL(record.lastBillValue),
        `${record.lastKwh} kWh`,
        formatBRL(record.goalValue),
        getEconomyLabel(economyPercent),
      ]
    })
  }

  return {
    history,
    totalKwh,
    monthlyAverage,
    monthCount,
    deleteFromHistory,
    getRecordEconomyPercent,
    getEconomyBadgeClass,
    getEconomyLabel,
    buildPdfRows,
  }
}
