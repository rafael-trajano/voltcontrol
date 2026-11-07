/*
  statistics.js — funções de estatística usadas na tela de Análise.

  Todas as funções são "puras": recebem uma lista de números e devolvem
  o resultado, sem depender de React. Assim dá para testar cada uma
  comparando com o cálculo feito à mão nas listas da disciplina.
*/

// ---------- Auxiliares ----------

export function sortAsc(values) {
  return [...values].map(Number).sort((a, b) => a - b)
}

export function sum(values) {
  return values.reduce((acc, v) => acc + Number(v), 0)
}

// ---------- Média (Lista 3) ----------

// Média: soma de todos os valores dividida pela quantidade (Σx / n)
export function mean(values) {
  if (values.length === 0) return 0
  return sum(values) / values.length
}

// ---------- Medidas de dispersão (Lista 4) ----------

// Amplitude total: maior valor − menor valor
export function range(values) {
  if (values.length === 0) return 0
  const sorted = sortAsc(values)
  return sorted[sorted.length - 1] - sorted[0]
}

// Variância amostral: s² = Σ(x − média)² / (n − 1)
export function variance(values) {
  const n = values.length
  if (n < 2) return 0
  const m = mean(values)
  const squaredDeviations = values.reduce((acc, v) => acc + (Number(v) - m) ** 2, 0)
  return squaredDeviations / (n - 1)
}

// Desvio padrão: s = √s²
export function standardDeviation(values) {
  return Math.sqrt(variance(values))
}

// Coeficiente de variação: CV = s / média × 100
export function coefficientOfVariation(values) {
  const m = mean(values)
  if (m === 0) return 0
  return (standardDeviation(values) / m) * 100
}

// Classificação do CV usada na disciplina
export function classifyCV(cv) {
  if (cv <= 15) return { level: 'baixa', label: 'Consumo estável', status: 'success' }
  if (cv <= 30) return { level: 'média', label: 'Consumo moderadamente variável', status: 'warning' }
  return { level: 'alta', label: 'Consumo muito variável', status: 'danger' }
}

// ---------- Boxplot (Lista 4) ----------

// Quantil pelo mesmo método padrão do R (tipo 7), usado no boxplot da disciplina
export function quantile(values, p) {
  const sorted = sortAsc(values)
  const n = sorted.length
  if (n === 0) return 0
  const position = (n - 1) * p
  const lower = Math.floor(position)
  const upper = Math.ceil(position)
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower)
}

// Resumo do boxplot: quartis, AIQ, limites e valores discrepantes (outliers)
export function boxplotSummary(values) {
  const sorted = sortAsc(values)
  const q1 = quantile(sorted, 0.25)
  const q2 = quantile(sorted, 0.5)
  const q3 = quantile(sorted, 0.75)
  const iqr = q3 - q1
  const lowerFence = q1 - 1.5 * iqr
  const upperFence = q3 + 1.5 * iqr

  const inside = sorted.filter((v) => v >= lowerFence && v <= upperFence)
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence)

  // Simetria: compara a distância da mediana até Q1 e até Q3
  const distLower = q2 - q1
  const distUpper = q3 - q2
  let symmetry = 'aproximadamente simétrica'
  if (distUpper > distLower * 1.2) symmetry = 'assimétrica à direita (positiva)'
  else if (distLower > distUpper * 1.2) symmetry = 'assimétrica à esquerda (negativa)'

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    q1,
    q2,
    q3,
    iqr,
    lowerFence,
    upperFence,
    whiskerLow: inside[0],
    whiskerHigh: inside[inside.length - 1],
    outliers,
    symmetry,
  }
}

// ---------- Tabela de frequência (Lista 2) ----------

// Número de classes pela regra de Sturges: k = 1 + 3,3 · log10(n)
export function sturgesClasses(n) {
  return Math.max(1, Math.round(1 + 3.3 * Math.log10(n)))
}

// Monta a tabela de frequência em classes [li ; ls)
export function frequencyTable(values) {
  const n = values.length
  if (n === 0) return { classes: [], k: 0, width: 0, totalRange: 0 }

  const sorted = sortAsc(values)
  const min = sorted[0]
  const totalRange = sorted[n - 1] - min
  const k = sturgesClasses(n)
  const width = Math.max(1, Math.ceil(totalRange / k))

  let cumulative = 0
  const classes = Array.from({ length: k }, (_, i) => {
    const lower = min + i * width
    const upper = lower + width
    const isLast = i === k - 1
    const fa = sorted.filter((v) => v >= lower && (isLast ? v <= upper : v < upper)).length
    cumulative += fa
    const fr = fa / n
    return {
      lower,
      upper,
      isLast,
      midpoint: (lower + upper) / 2,
      fa,
      fr,
      fp: fr * 100,
      Fa: cumulative,
      Fr: cumulative / n,
      Fp: (cumulative / n) * 100,
    }
  })

  return { classes, k, width, totalRange }
}

// ---------- Probabilidade (Lista 5) ----------

// Probabilidade de pelo menos uma ocorrência em `trials` tentativas
// independentes: 1 − (1 − p)^trials
export function probAtLeastOne(p, trials) {
  return 1 - (1 - p) ** trials
}
