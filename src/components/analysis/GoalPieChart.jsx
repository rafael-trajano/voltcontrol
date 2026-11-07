import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

/*
  GoalPieChart — gráfico de setores com a proporção de meses
  acima e dentro da meta.
*/
function GoalPieChart({ overCount, underCount }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    if (chartRef.current) chartRef.current.destroy()

    const total = overCount + underCount

    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Acima da meta', 'Dentro da meta'],
        datasets: [
          {
            data: [overCount, underCount],
            backgroundColor: ['#dc2626', '#1BA041'],
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#64748b', boxWidth: 12 } },
          tooltip: {
            callbacks: {
              label: (item) => {
                const pct = ((item.raw / total) * 100).toFixed(1).replace('.', ',')
                return `${item.label}: ${item.raw} meses (${pct}%)`
              },
            },
          },
        },
      },
    })

    return () => chartRef.current?.destroy()
  }, [overCount, underCount])

  return (
    <div className="analysis-chart analysis-chart--pie">
      <canvas ref={canvasRef} aria-label="Meses acima e dentro da meta" role="img" />
    </div>
  )
}

export default GoalPieChart
