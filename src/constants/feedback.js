export const FEEDBACK_WARNING_THRESHOLD = 10

export const FEEDBACK_CONFIG = {
  success: {
    variant: 'success',
    title: 'Parabéns!',
    titleColor: '#1BA041',
  },
  warning: {
    variant: 'warning',
    title: 'Atenção!',
    titleColor: '#f59e0b',
  },
  danger: {
    variant: 'danger',
    title: 'Meta ultrapassada!',
    titleColor: '#dc2626',
  },
}

export const FEEDBACK_MESSAGES = {
  success: (percent) =>
    `Você está economizando ${Math.abs(percent)}% além da sua meta de energia.`,
  warning: (percent) =>
    `Você está a apenas ${percent}% da sua meta. Pequenos ajustes já fazem a diferença!`,
  danger: (percent) =>
    `Você precisa economizar cerca de ${percent}% de energia para atingir a sua meta.`,
}

export const DICA_TEXTS = {
  success:
    'Continue mantendo seus hábitos de consumo. Pequenas ações como desligar aparelhos em standby fazem grande diferença no fim do mês.',
  warning:
    'Pequenos ajustes no consumo já podem ser suficientes para atingir seu objetivo no próximo mês.',
  danger:
    'Verifique quais aparelhos consomem mais energia e considere reduzir o tempo de uso ou substituí-los por modelos mais eficientes.',
}

export const DICA_COLORS = {
  success: '#1BA041',
  warning: '#f59e0b',
  danger: '#dc2626',
}
