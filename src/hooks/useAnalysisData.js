import { useEnergy } from './useEnergy'
import {
  mean,
  range,
  variance,
  standardDeviation,
  coefficientOfVariation,
  classifyCV,
  boxplotSummary,
  frequencyTable,
  probAtLeastOne,
} from '../utils/statistics'
import {
  SUMMER_MONTHS,
  MIN_MONTHS_FOR_ANALYSIS,
  FORECAST_MONTHS,
} from '../constants/sampleData'

/*
  useAnalysisData — reúne os meses do histórico e calcula todas as
  medidas estatísticas exibidas na tela de Análise.
*/

function isOverGoal(record) {
  return Number(record.lastBillValue) > Number(record.goalValue)
}

function isSummer(record) {
  const month = record.billMonth?.split('-')[1]
  return SUMMER_MONTHS.includes(month)
}

export function useAnalysisData() {
  const { history, loadSampleHistory } = useEnergy()

  const records = [...history].sort((a, b) => a.billMonth.localeCompare(b.billMonth))
  const n = records.length
  const hasEnoughData = n >= MIN_MONTHS_FOR_ANALYSIS

  if (!hasEnoughData) {
    return { n, hasEnoughData, loadSampleHistory }
  }

  const kwhValues = records.map((r) => Number(r.lastKwh))

  // Média e medidas de dispersão do consumo (kWh)
  const cv = coefficientOfVariation(kwhValues)
  const dispersion = {
    mean: mean(kwhValues),
    total: kwhValues.reduce((acc, v) => acc + v, 0),
    range: range(kwhValues),
    variance: variance(kwhValues),
    sd: standardDeviation(kwhValues),
    cv,
    cvClass: classifyCV(cv),
  }

  // Boxplot e meses atípicos
  const box = boxplotSummary(kwhValues)
  const outlierMonths = records.filter((r) => box.outliers.includes(Number(r.lastKwh)))

  // Distribuição de frequência
  const frequency = frequencyTable(kwhValues)

  // Probabilidade: meses acima da meta
  const overCount = records.filter(isOverGoal).length
  const pOver = overCount / n

  const summerRecords = records.filter(isSummer)
  const otherRecords = records.filter((r) => !isSummer(r))
  const summerOver = summerRecords.filter(isOverGoal).length
  const otherOver = otherRecords.filter(isOverGoal).length

  const pSummer = summerRecords.length / n
  const pOverAndSummer = summerOver / n

  const probability = {
    overCount,
    underCount: n - overCount,
    pOver,
    forecastMonths: FORECAST_MONTHS,
    pAtLeastOne: probAtLeastOne(pOver, FORECAST_MONTHS),
    summerCount: summerRecords.length,
    summerOver,
    otherCount: otherRecords.length,
    otherOver,
    pOverGivenSummer: summerRecords.length ? summerOver / summerRecords.length : null,
    pOverGivenOther: otherRecords.length ? otherOver / otherRecords.length : null,
    pSummer,
    pOverAndSummer,
    productIndependence: pOver * pSummer,
    independent: Math.abs(pOverAndSummer - pOver * pSummer) < 0.005,
  }

  return {
    n,
    hasEnoughData,
    loadSampleHistory,
    records,
    dispersion,
    box,
    outlierMonths,
    frequency,
    probability,
  }
}
