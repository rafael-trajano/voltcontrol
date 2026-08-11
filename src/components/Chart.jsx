import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import './Chart.css'

Chart.register(...registerables)

function ChartComponent({
  actualValue,
  goalValue,
  label = 'COMPARAÇÃO DE CONSUMO (R$)',
}) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')

    if (chartRef.current) {
      chartRef.current.destroy()
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Atual', 'Meta'],
        datasets: [
          {
            data: [actualValue, goalValue],
            backgroundColor: ['#1a56db', '#059669'],
            borderRadius: 8,
            borderSkipped: false,
            barThickness: 60,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `R$ ${Number(ctx.raw).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#e2e8f0' },
            ticks: {
              callback: (value) => `R$ ${value}`,
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

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [actualValue, goalValue])

  return (
    <div className="chart">
      <div className="chart__header">
        <span className="chart__label">{label}</span>

        <div className="chart__legend">
          <span className="chart__legend-dot chart__legend-dot--actual" />
          <span className="chart__legend-text">Atual</span>

          <span className="chart__legend-dot chart__legend-dot--goal" />
          <span className="chart__legend-text">Meta</span>
        </div>
      </div>

      <canvas ref={canvasRef} />
    </div>
  )
}

export default ChartComponent
