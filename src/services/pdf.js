import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import { formatBRL } from '../utils/calculations'
import { PDF_TABLE_HEADERS } from '../constants/ui'

export function generateHistoryPdf({
  monthlyAverage,
  totalKwh,
  history,
  buildPdfRows,
}) {
  const doc = new jsPDF()

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('VoltControl — Histórico de Consumo', 14, 20)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text(
    `Gerado em: ${new Date().toLocaleDateString('pt-BR')}`,
    14,
    28,
  )

  doc.setDrawColor(200)
  doc.line(14, 32, 196, 32)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Resumo', 14, 42)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Média Mensal: ${formatBRL(monthlyAverage)}`, 14, 50)
  doc.text(`Consumo Total Acumulado: ${totalKwh} kWh`, 14, 57)
  doc.text(`Meses Registrados: ${history.length}`, 14, 64)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Registros', 14, 76)

  autoTable(doc, {
    startY: 82,
    head: [PDF_TABLE_HEADERS],
    body: buildPdfRows(),
    styles: {
      fontSize: 10,
      font: 'helvetica',
    },
    headStyles: {
      fillColor: [26, 86, 219],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: {
      left: 14,
      right: 14,
    },
  })

  doc.save('voltcontrol-historico.pdf')
}