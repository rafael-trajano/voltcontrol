import QuestionStep from '../components/QuestionStep'
import PageFooter from '../components/PageFooter'
import { useQuestionForm } from '../hooks/useQuestionForm'
import './Questions.css'

function Questions() {
  const {
    currentStep,
    currentStepIndex,
    formData,
    errorMessage,
    isFirstStep,
    totalSteps,
    handleFieldChange,
    handleNext,
    handleBack,
  } = useQuestionForm()

  return (
    <div className="questions-page">
      <div className="questions-page__header">
        <h1 className="questions-page__title">Adicionar Conta</h1>
        <p className="questions-page__subtitle">
          Registre sua conta de energia e acompanhe seu consumo mês a mês.
        </p>
      </div>

      <QuestionStep
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
        question={currentStep.question}
        hint={currentStep.hint}
        prefix={currentStep.prefix}
        placeholder={currentStep.placeholder}
        value={formData[currentStep.field]}
        onChange={handleFieldChange}
        onNext={handleNext}
        onBack={handleBack}
        isFirst={isFirstStep}
        inputType={currentStep.inputType}
        error={errorMessage}
      />

      <p className="questions-page__privacy">
        Seus dados são armazenados apenas no seu navegador.
      </p>

      <PageFooter />
    </div>
  )
}

export default Questions
