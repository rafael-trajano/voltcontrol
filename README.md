# VoltControl

**Monitoramento inteligente de consumo de energia elétrica.**

VoltControl é um dashboard web que permite acompanhar gastos com energia elétrica, definir metas mensais e visualizar a evolução do consumo ao longo do tempo, tudo armazenado localmente no navegador, sem necessidade de cadastro.

**[Acesse o VoltControl](https://voltcontrol.netlify.app)**

## Páginas

- **Adicionar Conta** — wizard de 5 passos para registrar os dados da fatura
- **Dashboard** — visão geral com feedback, gráfico comparativo e resumo financeiro
- **Histórico** — tabela de registros mensais com exportação em PDF

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 | Biblioteca principal |
| React Router v7 | Navegação entre páginas |
| Context API | Estado global da aplicação |
| Custom Hooks | Separação de lógica de negócio |
| LocalStorage | Persistência de dados |
| Chart.js | Gráfico comparativo |
| jsPDF + AutoTable | Exportação de histórico em PDF |
| CSS (arquivos separados) | Estilização por componente |
| Vite 8 | Bundler e servidor de desenvolvimento |

## Estrutura de Pastas

```
src/
│
├── constants/
│   ├── feedback.js       # Configurações, mensagens e cores do feedback
│   ├── form.js           # Passos do wizard, formulário vazio e mensagens de validação
│   └── ui.js             # Textos fixos, cabeçalhos de tabela e nome da aplicação
│
├── context/
│   ├── EnergyContext.js  # Criação do contexto (createContext)
│   └── EnergyContext.jsx # Provider com estado, useMemo e useCallback
│
├── hooks/
│   ├── useDashboardData.js  # Lógica e cálculos do Dashboard
│   ├── useEnergy.js         # Acesso ao EnergyContext
│   ├── useHistoryData.js    # Lógica e cálculos do Histórico
│   └── useQuestionForm.js   # Lógica e validação do wizard
│
├── components/
│   ├── dashboard/
│   │   ├── ActualValueCard.jsx  # Card de valores atuais
│   │   ├── ConsumptionCard.jsx  # Card de dados da conta
│   │   ├── FeedbackCard.jsx     # Card de feedback (verde/amarelo/vermelho)
│   │   ├── GoalCard.jsx         # Card da meta
│   │   └── TipCard.jsx          # Card de dica com cor dinâmica por status
│   │
│   ├── Button.jsx          # Botão reutilizável (primary, secondary, outline, danger)
│   ├── Card.jsx            # Card reutilizável com variantes
│   ├── Chart.jsx           # Gráfico de barras com Chart.js
│   ├── ConfirmModal.jsx    # Modal de confirmação de exclusão
│   ├── Navbar.jsx          # Sidebar de navegação com NavLink ativo
│   ├── PageFooter.jsx      # Footer reutilizável entre páginas
│   ├── PageHeader.jsx      # Cabeçalho reutilizável entre páginas
│   ├── QuestionStep.jsx    # Passo do wizard (progresso, input, navegação)
│   └── SummaryRow.jsx      # Linha de label + valor dos cards de resumo
│
├── pages/
│   ├── Dashboard.jsx     # Página principal — apenas renderização
│   ├── History.jsx       # Histórico mensal com exportação PDF
│   └── Questions.jsx     # Wizard de entrada de dados
│
├── services/
│   ├── pdf.js            # Geração do PDF com jsPDF e AutoTable
│   └── storage.js        # Abstração do LocalStorage (save/load/clear)
│
├── utils/
│   └── calculations.js   # Funções puras: cálculos, formatação, feedback
│
├── App.jsx               # Rotas com React Router
├── App.css               # Design tokens globais e reset CSS
└── main.jsx              # Entrypoint com BrowserRouter e EnergyProvider
```

## Como Rodar

```bash
# Clone o repositório
git clone https://github.com/rafael-trajano/voltcontrol.git
cd voltcontrol

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

## Lógica de Cálculo

O feedback é baseado no **custo com energia**, o único valor que o usuário pode controlar, excluindo taxas e impostos fixos.

```
Custo com Energia Atual = kWh consumido × tarifa
Taxas e Impostos        = Valor Total − Custo com Energia Atual
Custo com Energia Meta  = Meta − Taxas e Impostos
Limite em kWh da Meta   = Custo com Energia Meta ÷ tarifa
% Economia necessária   = (Custo Atual − Custo Meta) / Custo Atual × 100
```

**Faixas de feedback:**
- **Verde** - consumo dentro ou abaixo da meta
- **Amarelo** - até 10% acima da meta
- **Vermelho** - mais de 10% acima da meta

## Arquitetura

O projeto segue o princípio de **separação de responsabilidades**:

- **`constants/`** - centraliza todos os valores fixos, mensagens e configurações
- **`hooks/`** - contém toda a lógica de negócio, deixando os componentes responsáveis apenas pela renderização
- **`components/`** - componentes reutilizáveis e sem lógica de negócio própria
- **`utils/`** - funções puras de cálculo e formatação, fáceis de testar
- **`services/`** - abstração de acesso a dados externos (LocalStorage e PDF)

## Persistência

Os dados são salvos automaticamente no **LocalStorage** do navegador via `useEffect`. Nenhuma informação é enviada a servidores externos.

## Responsividade

A aplicação é totalmente responsiva:
- **Mobile** - header fixo no topo, bottom navigation fixa, cards adaptados
- **Tablet** - grid reorganizado, espaçamentos ajustados
- **Desktop** - layout completo com sidebar fixa

## Autor

Desenvolvido por **Rafael Trajano**

## Licença

MIT © 2026 Rafael Trajano
