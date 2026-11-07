/*
  Dados de exemplo: 12 meses fictícios (set/2025 a ago/2026) para
  demonstrar a tela de Análise. Tarifa de R$ 0,70/kWh e impostos de
  30% sobre o custo da energia. Meta de R$ 150,00 em todos os meses.
*/

const KWH_RATE = 0.7
const GOAL_VALUE = 150

const MONTHS = [
  ['2025-09', 150],
  ['2025-10', 158],
  ['2025-11', 162],
  ['2025-12', 205],
  ['2026-01', 240],
  ['2026-02', 198],
  ['2026-03', 172],
  ['2026-04', 155],
  ['2026-05', 148],
  ['2026-06', 155],
  ['2026-07', 160],
  ['2026-08', 180],
]

export const SAMPLE_HISTORY = MONTHS.map(([billMonth, kwh], index) => ({
  id: 1000 + index,
  billMonth,
  lastKwh: String(kwh),
  kwhRate: String(KWH_RATE),
  lastBillValue: (kwh * KWH_RATE * 1.3).toFixed(2),
  goalValue: String(GOAL_VALUE),
}))

// Meses de verão no Brasil (dezembro, janeiro e fevereiro)
export const SUMMER_MONTHS = ['12', '01', '02']

// Quantidade mínima de meses para a análise fazer sentido
export const MIN_MONTHS_FOR_ANALYSIS = 3

// Horizonte da previsão "pelo menos um mês acima da meta"
export const FORECAST_MONTHS = 3
