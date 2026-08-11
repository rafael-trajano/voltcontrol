import Button from './Button'
import './QuestionStep.css'

function QuestionStep({
  currentStep,
  totalSteps,
  question,
  hint,
  prefix,
  placeholder,
  value,
  onChange,
  onNext,
  onBack,
  isFirst,
  inputType,
  error,
}) {
  const progressPercent = (currentStep / totalSteps) * 100

  function handleKeyDown(e) {
    if (e.key === 'Enter') onNext()
  }

  return (
    <div className="question-step">
      <div className="question-step__header">
        <span className="question-step__step-count">
          PASSO {currentStep} DE {totalSteps}
        </span>
        <span className="question-step__percent">{Math.round(progressPercent)}% concluído</span>
      </div>

      <div className="question-step__progress-track">
        <div
          className="question-step__progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="question-step__content">
        <h2 className="question-step__question">{question}</h2>

        {hint && <p className="question-step__hint">{hint}</p>}

        <div className={`question-step__input-wrapper ${error ? 'question-step__input-wrapper--error' : ''}`}>
          {prefix && <span className="question-step__prefix">{prefix}</span>}
          <input
            className="question-step__input"
            type={inputType}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>

        {error && <p className="question-step__error">{error}</p>}

        <Button variant="primary" fullWidth onClick={onNext} className="question-step__next-button">
          Próximo
        </Button>

        {!isFirst && (
          <Button variant="secondary" onClick={onBack} className="question-step__back-button">
            Voltar
          </Button>
        )}
      </div>
    </div>
  )
}

export default QuestionStep
