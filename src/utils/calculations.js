import {
  FEEDBACK_WARNING_THRESHOLD,
  FEEDBACK_MESSAGES,
  DICA_TEXTS,
  DICA_COLORS,
} from '../constants/feedback'

export function formatBRL(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function formatMonth(value) {
  if (!value) return ''
  const [year, month] = value.split('-')
  const date = new Date(year, month - 1)
  return date
    .toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    .replace(/^\w/, (c) => c.toUpperCase())
}

export function calcEnergyEconomyPercent(actualEnergyCost, goalEnergyCost) {
  if (!actualEnergyCost || actualEnergyCost <= 0) return 0
  return Math.round(
    ((actualEnergyCost - goalEnergyCost) / actualEnergyCost) * 100
  )
}

export function getFeedbackStatus(economyPercent) {
  if (economyPercent <= 0) return 'success'
  if (economyPercent <= FEEDBACK_WARNING_THRESHOLD) return 'warning'
  return 'danger'
}

export function getFeedbackMessage(economyPercent) {
  const status = getFeedbackStatus(economyPercent)
  return FEEDBACK_MESSAGES[status](economyPercent)
}

export function getDicaText(status) {
  return DICA_TEXTS[status]
}

export function getDicaColor(status) {
  return DICA_COLORS[status]
}

export function calcConsumptionData(record) {
  const actualTotal  = Number(record.lastBillValue)
  const actualEnergy = Number(record.lastKwh) * Number(record.kwhRate)
  const actualTaxes  = actualTotal - actualEnergy
  const goalTotal    = Number(record.goalValue)
  const goalEnergy   = goalTotal - actualTaxes
  const goalKwhLimit = goalEnergy > 0
    ? Math.round(goalEnergy / Number(record.kwhRate))
    : 0

  return {
    actualTotal,
    actualEnergy,
    actualTaxes,
    goalTotal,
    goalEnergy,
    goalKwhLimit,
  }
}
