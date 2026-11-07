/*
  PageIcon — ícones das páginas.

  Mesmas formas simples de ícones de linha (círculo com "+", barras,
  relógio, rosca), com acabamento ilustrado:
  formas preenchidas e arredondadas e faixa mais escura embaixo.
  Cores da paleta do site.

  Uso: <PageIcon name="analysis" size={24} />
*/

const C = {
  green: '#1BA041', // --color-primary
  greenDark: '#177b32', // --color-primary-dark
  blue: '#0046DD', // azul da "Meta"
  blueDark: '#0035a8',
  amber: '#f59e0b', // --color-warning
  amberDark: '#d97706',
  red: '#dc2626', // --color-danger
  redDark: '#b91c1c',
  slate: '#cbd5e1',
  ink: '#0f172a', // --color-text-primary
  white: '#ffffff',
}

const ICONS = {
  // Adicionar Conta: círculo com "+"
  add: (
    <>
      <circle cx="24" cy="26" r="19" fill={C.greenDark} />
      <circle cx="24" cy="24" r="19" fill={C.green} />
      <path d="M24 15.5v17M15.5 24h17" stroke={C.white} strokeWidth="5" strokeLinecap="round" />
    </>
  ),

  // Dashboard: gráfico de barras
  dashboard: (
    <>
      <rect x="6" y="28" width="10" height="15" rx="3.5" fill={C.greenDark} />
      <rect x="6" y="26" width="10" height="15" rx="3.5" fill={C.green} />
      <rect x="19" y="18" width="10" height="25" rx="3.5" fill={C.amberDark} />
      <rect x="19" y="16" width="10" height="25" rx="3.5" fill={C.amber} />
      <rect x="32" y="9" width="10" height="34" rx="3.5" fill={C.blueDark} />
      <rect x="32" y="7" width="10" height="34" rx="3.5" fill={C.blue} />
    </>
  ),

  // Histórico: relógio
  history: (
    <>
      <circle cx="24" cy="26" r="16" fill="none" stroke={C.amberDark} strokeWidth="6" />
      <circle cx="24" cy="24" r="16" fill={C.white} stroke={C.amber} strokeWidth="6" />
      <path d="M24 16.5V24l4.5 3" stroke={C.ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),

  // Análise: gráfico de rosca em três partes iguais
  analysis: (
    <>
      <path d="M10.82 33.16A15 15 0 0 1 23.61 11.01" fill="none" stroke={C.greenDark} strokeWidth="9" />
      <path d="M24.39 11.01A15 15 0 0 1 37.18 33.16" fill="none" stroke={C.amberDark} strokeWidth="9" />
      <path d="M36.79 33.84A15 15 0 0 1 11.21 33.84" fill="none" stroke={C.blueDark} strokeWidth="9" />
      <path d="M10.82 31.16A15 15 0 0 1 23.61 9.01" fill="none" stroke={C.green} strokeWidth="9" />
      <path d="M24.39 9.01A15 15 0 0 1 37.18 31.16" fill="none" stroke={C.amber} strokeWidth="9" />
      <path d="M36.79 31.84A15 15 0 0 1 11.21 31.84" fill="none" stroke={C.blue} strokeWidth="9" />
    </>
  ),
}

function PageIcon({ name, size = 24, className = '' }) {
  return (
    <svg
      className={`page-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  )
}

export default PageIcon
