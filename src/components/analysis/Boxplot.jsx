import { formatNumber } from '../../utils/calculations'

/*
  Boxplot — desenhado em SVG (o Chart.js não tem boxplot nativo).
  Caixa de Q1 a Q3, linha na mediana, bigodes até o menor e o maior
  valor que não são outliers, e outliers como círculos vermelhos.
*/

const WIDTH = 640
const HEIGHT = 170
const PAD_X = 40
const BOX_Y = 40
const BOX_H = 56
const AXIS_Y = 130

function niceTicks(min, max, count = 6) {
  const rawStep = (max - min) / count
  const magnitude = 10 ** Math.floor(Math.log10(rawStep))
  const step = [1, 2, 5, 10].map((m) => m * magnitude).find((s) => s >= rawStep)
  const start = Math.floor(min / step) * step
  const ticks = []
  for (let t = start; t <= max + step / 2; t += step) ticks.push(t)
  return ticks
}

function Boxplot({ box, unit = 'kWh' }) {
  const ticks = niceTicks(box.min, box.max)
  const domainMin = ticks[0]
  const domainMax = ticks[ticks.length - 1]
  const x = (v) => PAD_X + ((v - domainMin) / (domainMax - domainMin)) * (WIDTH - 2 * PAD_X)
  const midY = BOX_Y + BOX_H / 2

  return (
    <svg
      className="boxplot"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={`Boxplot do consumo: Q1 ${box.q1}, mediana ${box.q2}, Q3 ${box.q3} ${unit}`}
    >
      {/* Bigodes */}
      <line x1={x(box.whiskerLow)} x2={x(box.q1)} y1={midY} y2={midY} className="boxplot__whisker" />
      <line x1={x(box.q3)} x2={x(box.whiskerHigh)} y1={midY} y2={midY} className="boxplot__whisker" />
      <line x1={x(box.whiskerLow)} x2={x(box.whiskerLow)} y1={midY - 14} y2={midY + 14} className="boxplot__cap" />
      <line x1={x(box.whiskerHigh)} x2={x(box.whiskerHigh)} y1={midY - 14} y2={midY + 14} className="boxplot__cap" />

      {/* Caixa Q1–Q3 e mediana */}
      <rect x={x(box.q1)} y={BOX_Y} width={x(box.q3) - x(box.q1)} height={BOX_H} className="boxplot__box" rx="4" />
      <line x1={x(box.q2)} x2={x(box.q2)} y1={BOX_Y} y2={BOX_Y + BOX_H} className="boxplot__median" />

      {/* Rótulos Q1, Md, Q3 */}
      <text x={x(box.q1)} y={BOX_Y - 8} className="boxplot__label" textAnchor="middle">Q1</text>
      <text x={x(box.q2)} y={BOX_Y - 8} className="boxplot__label boxplot__label--strong" textAnchor="middle">Md</text>
      <text x={x(box.q3)} y={BOX_Y - 8} className="boxplot__label" textAnchor="middle">Q3</text>

      {/* Outliers */}
      {box.outliers.map((v, i) => (
        <g key={`${v}-${i}`}>
          <circle cx={x(v)} cy={midY} r="6" className="boxplot__outlier" />
          <text x={x(v)} y={BOX_Y - 8} className="boxplot__label boxplot__label--danger" textAnchor="middle">
            {formatNumber(v, 0)}
          </text>
        </g>
      ))}

      {/* Eixo */}
      <line x1={PAD_X} x2={WIDTH - PAD_X} y1={AXIS_Y} y2={AXIS_Y} className="boxplot__axis" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1={AXIS_Y} y2={AXIS_Y + 5} className="boxplot__axis" />
          <text x={x(t)} y={AXIS_Y + 20} className="boxplot__tick" textAnchor="middle">
            {formatNumber(t, 0)}
          </text>
        </g>
      ))}
      <text x={WIDTH / 2} y={HEIGHT - 2} className="boxplot__tick" textAnchor="middle">
        Consumo ({unit})
      </text>
    </svg>
  )
}

export default Boxplot
