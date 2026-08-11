export const FORM_STEPS = [
  {
    question: 'Quanto você gostaria de pagar por mês?',
    prefix: 'R$',
    field: 'goalValue',
    inputType: 'number',
    placeholder: '150,00',
    hint: 'Defina sua meta mensal de gasto com energia.',
  },
  {
    question: 'Quanto foi o valor da sua última conta?',
    prefix: 'R$',
    field: 'lastBillValue',
    inputType: 'number',
    placeholder: '180,00',
    hint: 'Informe o valor total da fatura do mês anterior.',
  },
  {
    question: 'Quantos kWh você consumiu no último mês?',
    prefix: 'kWh',
    field: 'lastKwh',
    inputType: 'number',
    placeholder: '180',
    hint: 'Você encontra essa informação na sua fatura de energia.',
  },
  {
    question: 'Qual o valor do kWh na sua região?',
    prefix: 'R$/kWh',
    field: 'kwhRate',
    inputType: 'number',
    placeholder: '0,7',
    hint: 'Consulte sua fatura ou o site da sua distribuidora.',
  },
  {
    question: 'A qual mês corresponde essa conta?',
    prefix: '',
    field: 'billMonth',
    inputType: 'month',
    placeholder: '',
    hint: 'Selecione o mês de referência da conta informada.',
  },
]

export const EMPTY_FORM = {
  goalValue: '',
  lastBillValue: '',
  lastKwh: '',
  kwhRate: '',
  billMonth: '',
}

export const VALIDATION_MESSAGES = {
  required: 'Por favor, preencha este campo.',
  positiveNumber: 'Digite um valor maior que zero.',
}
