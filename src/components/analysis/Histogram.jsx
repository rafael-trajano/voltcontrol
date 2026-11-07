import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { formatNumber } from '../../utils/calculations'

Chart.register(...registerables)

/*
  Histogram — uma barra por classe da tabela de frequência (altura =
  frequência absoluta), no mesmo estilo do gráfico do Dashboard.
*/
function Histogram({ classes }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)
  // Recria o gráfico só quando os dados mudam (e não a cada renderização)
  const dataKey = classes.map((c) => `${c.lower}:${c.upper}:${c.fa}`).join('|')

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    if (chartRef.current) chartRef.current.destroy()

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: classes.map((c) => `${formatNumber(c.lower, 0)}–${formatNumber(c.upper, 0)}`),
        datasets: [
          {
            data: classes.map((c) => c.fa),
            backgroundColor: '#1BA041',
            borderRadius: 8,
            borderSkipped: false,
            maxBarThickness: 60,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) => `${items[0].label} kWh`,
              label: (item) => `${item.raw} ${item.raw === 1 ? 'mês' : 'meses'}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#e2e8f0' },
            ticks: {
              stepSize: 1,
              font: { size: 12 },
              color: '#94a3b8',
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { size: 13 },
              color: '#64748b',
            },
          },
        },
      },
    })

    return () => chartRef.current?.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataKey])

  return (
    <div className="analysis-chart">
      <canvas ref={canvasRef} aria-label="Histograma do consumo mensal em kWh" role="img" />
    </div>
  )
}

export default Histogram
