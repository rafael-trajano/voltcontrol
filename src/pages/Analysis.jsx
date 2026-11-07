import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnalysisData } from '../hooks/useAnalysisData'
import { formatMonth, formatNumber, formatPercent } from '../utils/calculations'
import { APP_FOOTER } from '../constants/ui'
import Button from '../components/Button'
import Card from '../components/Card'
import SummaryRow from '../components/SummaryRow'
import PageHeader from '../components/PageHeader'
import ConfirmModal from '../components/ConfirmModal'
import Histogram from '../components/analysis/Histogram'
import Boxplot from '../components/analysis/Boxplot'
import GoalPieChart from '../components/analysis/GoalPieChart'
import './Analysis.css'

const VARIABLES = [
  ['Consumo (kWh)', 'Quantitativa contínua'],
  ['Valor da conta (R$)', 'Quantitativa contínua'],
  ['Mês de referência', 'Qualitativa ordinal'],
  ['Situação da meta (acima / dentro)', 'Qualitativa nominal'],
  ['Estação (verão / demais meses)', 'Qualitativa nominal'],
]

const CV_COLORS = { success: '#1BA041', warning: '#f59e0b', danger: '#dc2626' }

function Formulas({ items }) {
  return (
    <details className="analysis__formulas">
      <summary>Como calculamos</summary>
      <ul>
        {items.map(([name, formula]) => (
          <li key={name}>
            <strong>{name}:</strong> {formula}
          </li>
        ))}
      </ul>
    </details>
  )
}

function Analysis() {
  const navigate = useNavigate()
  const data = useAnalysisData()
  const [confirmSample, setConfirmSample] = useState(false)

  function handleLoadSample() {
    if (data.n > 0) setConfirmSample(true)
    else data.loadSampleHistory()
  }

  function handleConfirmSample() {
    data.loadSampleHistory()
    setConfirmSample(false)
  }

  const confirmModal = confirmSample && (
    <ConfirmModal
      message="Os 12 meses de exemplo vão substituir o histórico atual. Deseja continuar?"
      onConfirm={handleConfirmSample}
      onCancel={() => setConfirmSample(false)}
      confirmLabel="Carregar"
      confirmVariant="primary"
    />
  )

  if (!data.hasEnoughData) {
    return (
      <div className="analysis">
        <PageHeader
          title="Análise Estatística"
          subtitle={`Você tem ${data.n} ${data.n === 1 ? 'mês registrado' : 'meses registrados'}. A análise precisa de pelo menos 3 meses.`}
        />
        <div className="analysis__empty-actions">
          <Button variant="primary" onClick={handleLoadSample}>
            Carregar 12 meses de exemplo
          </Button>
          <Button variant="secondary" onClick={() => navigate('/questions')}>
            Adicionar Conta
          </Button>
        </div>
        <footer className="analysis__footer">{APP_FOOTER}</footer>
        {confirmModal}
      </div>
    )
  }

  const { n, records, dispersion, box, outlierMonths, frequency, probability } = data
  const period = `${formatMonth(records[0].billMonth)} a ${formatMonth(records[n - 1].billMonth)}`
  const outlierText = outlierMonths.length
    ? outlierMonths.map((r) => `${formatMonth(r.billMonth)} (${r.lastKwh} kWh)`).join(', ')
    : null

  return (
    <div className="analysis">
      <PageHeader
        title="Análise Estatística"
        subtitle={`Padrões do seu consumo de energia em ${n} meses (${period}).`}
      />

      <div className="analysis__metrics">
        <div className="metric-card metric-card--green">
          <span className="metric-card__label">Consumo Médio</span>
          <span className="metric-card__value">{formatNumber(dispersion.mean, 1)} kWh</span>
        </div>
        <div className="metric-card metric-card--blue">
          <span className="metric-card__label">Desvio Padrão</span>
          <span className="metric-card__value">±{formatNumber(dispersion.sd, 1)} kWh</span>
        </div>
        <div className="metric-card metric-card--orange">
          <span className="metric-card__label">Meses Fora do Padrão</span>
          <span className="metric-card__value">{String(outlierMonths.length).padStart(2, '0')}</span>
        </div>
        <div className="metric-card metric-card--red">
          <span className="metric-card__label">Chance de Passar da Meta</span>
          <span className="metric-card__value">{formatPercent(probability.pOver)}</span>
        </div>
      </div>

      <Card>
        <p className="feedback__title" style={{ color: CV_COLORS[dispersion.cvClass.status] }}>
          {dispersion.cvClass.label}
        </p>
        <ul className="analysis__summary">
          <li>
            Você consome em média <strong>{formatNumber(dispersion.mean, 1)} kWh</strong> por mês, com
            variação típica de <strong>±{formatNumber(dispersion.sd, 1)} kWh</strong> (CV de{' '}
            {formatNumber(dispersion.cv, 1)}%).
          </li>
          <li>
            {outlierText ? (
              <>Mês fora do padrão: <strong>{outlierText}</strong>.</>
            ) : (
              'Nenhum mês ficou fora do padrão.'
            )}
          </li>
          <li>
            A chance de ficar acima da meta <strong>pelo menos uma vez</strong> nos próximos{' '}
            {probability.forecastMonths} meses é de <strong>{formatPercent(probability.pAtLeastOne)}</strong>.
          </li>
        </ul>
      </Card>

      <div className="analysis__grid">
        <Card title="Variabilidade do Consumo" className="analysis__card">
          <div>
            <SummaryRow label="Média" value={`${formatNumber(dispersion.mean, 2)} kWh`} />
            <SummaryRow label="Amplitude total" value={`${formatNumber(dispersion.range, 0)} kWh`} />
            <SummaryRow label="Variância" value={`${formatNumber(dispersion.variance, 2)} kWh²`} />
            <SummaryRow label="Desvio padrão" value={`${formatNumber(dispersion.sd, 2)} kWh`} />
            <SummaryRow
              label="Coeficiente de variação"
              value={`${formatNumber(dispersion.cv, 2)}% (${dispersion.cvClass.level})`}
            />
          </div>
          <Formulas
            items={[
              ['Média', `Σx / n = ${formatNumber(dispersion.total, 0)} / ${n}`],
              ['Amplitude', `maior − menor = ${formatNumber(box.max, 0)} − ${formatNumber(box.min, 0)}`],
              ['Variância', 's² = Σ(x − média)² / (n − 1)'],
              ['Desvio padrão', 's = √s²'],
              ['CV', 's / média × 100 (até 15%: baixa; 15% a 30%: média; acima de 30%: alta)'],
            ]}
          />
        </Card>

        <div className="chart">
          <div className="chart__header">
            <span className="chart__label">Histograma — Meses por Faixa de Consumo (kWh)</span>
          </div>
          <Histogram classes={frequency.classes} />
        </div>
      </div>

      <div className="history__table-wrapper">
        <table className="history__table analysis__freq-table">
          <thead>
            <tr>
              <th>Consumo (kWh)</th>
              <th>fa</th>
              <th>fr</th>
              <th>fp</th>
              <th>Fa</th>
              <th>Fp</th>
            </tr>
          </thead>
          <tbody>
            {frequency.classes.map((c) => (
              <tr key={c.lower}>
                <td>
                  [{formatNumber(c.lower, 0)} ; {formatNumber(c.upper, 0)}
                  {c.isLast ? ']' : ')'}
                </td>
                <td>{c.fa}</td>
                <td>{formatNumber(c.fr, 3)}</td>
                <td>{formatNumber(c.fp, 1)}%</td>
                <td>{c.Fa}</td>
                <td>{formatNumber(c.Fp, 1)}%</td>
              </tr>
            ))}
            <tr className="analysis__total-row">
              <td>Total</td>
              <td>{n}</td>
              <td>1,000</td>
              <td>100%</td>
              <td>–</td>
              <td>–</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="analysis__note">
        Tabela de frequência com {frequency.k} classes pela regra de Sturges (k = 1 + 3,3·log n) e
        amplitude de classe de {frequency.width} kWh.
      </p>

      <Card title="Meses Fora do Padrão">
        <Boxplot box={box} />
        <div className="analysis__box-facts">
          <div>
            <SummaryRow label="Q1" value={`${formatNumber(box.q1, 2)} kWh`} />
            <SummaryRow label="Mediana (Q2)" value={`${formatNumber(box.q2, 2)} kWh`} />
            <SummaryRow label="Q3" value={`${formatNumber(box.q3, 2)} kWh`} />
          </div>
          <div>
            <SummaryRow label="AIQ (Q3 − Q1)" value={`${formatNumber(box.iqr, 2)} kWh`} />
            <SummaryRow label="Limite inferior" value={`${formatNumber(box.lowerFence, 2)} kWh`} />
            <SummaryRow label="Limite superior" value={`${formatNumber(box.upperFence, 2)} kWh`} />
          </div>
        </div>
        <p className="dica__text">
          {outlierText ? <><strong>Fora do padrão:</strong> {outlierText}. </> : 'Nenhum mês fora do padrão. '}
          A distribuição é <strong>{box.symmetry}</strong>.
        </p>
        <Formulas
          items={[
            ['Outlier', 'valor abaixo de Q1 − 1,5·AIQ ou acima de Q3 + 1,5·AIQ'],
            ['Quartis', 'método padrão do R (tipo 7)'],
          ]}
        />
      </Card>

      <div className="analysis__grid">
        <div className="chart">
          <div className="chart__header">
            <span className="chart__label">Meses Acima × Dentro da Meta</span>
          </div>
          <GoalPieChart overCount={probability.overCount} underCount={probability.underCount} />
        </div>

        <Card title="Chance de Passar da Meta" className="analysis__card">
          <div>
            <SummaryRow
              label="Em um mês qualquer"
              value={`${probability.overCount}/${n} = ${formatPercent(probability.pOver)}`}
            />
            <SummaryRow
              label={`Pelo menos 1 vez em ${probability.forecastMonths} meses`}
              value={formatPercent(probability.pAtLeastOne)}
            />
            <SummaryRow
              label="Sabendo que é verão"
              value={
                probability.pOverGivenSummer === null
                  ? '—'
                  : `${probability.summerOver}/${probability.summerCount} = ${formatPercent(probability.pOverGivenSummer)}`
              }
            />
            <SummaryRow
              label="Sabendo que não é verão"
              value={
                probability.pOverGivenOther === null
                  ? '—'
                  : `${probability.otherOver}/${probability.otherCount} = ${formatPercent(probability.pOverGivenOther)}`
              }
            />
            <SummaryRow
              label="Estação e meta"
              value={probability.independent ? 'Independentes' : 'Não independentes'}
            />
          </div>
          <Formulas
            items={[
              ['P(acima)', 'meses acima da meta / total de meses'],
              ['Pelo menos uma vez', `1 − (1 − p)³ = 1 − (1 − ${formatNumber(probability.pOver, 4)})³`],
              ['Condicional', 'meses de verão acima da meta / meses de verão (dez, jan, fev)'],
              [
                'Independência',
                `P(acima ∩ verão) = ${formatNumber(probability.pOverAndSummer, 4)} e P(acima) × P(verão) = ${formatNumber(probability.productIndependence, 4)}`,
              ],
            ]}
          />
        </Card>
      </div>

      <div className="history__table-wrapper">
        <table className="history__table">
          <thead>
            <tr>
              <th>Variável analisada</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            {VARIABLES.map(([name, type]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="history__actions">
        <Button variant="primary" onClick={handleLoadSample}>
          Carregar Dados de Exemplo
        </Button>
      </div>

      <footer className="analysis__footer">{APP_FOOTER}</footer>
      {confirmModal}
    </div>
  )
}

export default Analysis
