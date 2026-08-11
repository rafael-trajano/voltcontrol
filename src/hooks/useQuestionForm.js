import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEnergy } from './useEnergy'
import { FORM_STEPS, EMPTY_FORM, VALIDATION_MESSAGES } from '../constants/form'

export function useQuestionForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { saveRecord } = useEnergy()

  const editingData = location.state?.editingData || null

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData]     = useState(editingData || EMPTY_FORM)
  const [errorMessage, setErrorMessage] = useState('')

  const currentStep = FORM_STEPS[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep  = currentStepIndex === FORM_STEPS.length - 1

  function handleFieldChange(newValue) {
    setFormData((prev) => ({ ...prev, [currentStep.field]: newValue }))
    setErrorMessage('')
  }

  function validateCurrentStep() {
    const fieldValue = formData[currentStep.field]

    if (!fieldValue || fieldValue === '') {
      setErrorMessage(VALIDATION_MESSAGES.required)
      return false
    }

    if (currentStep.inputType === 'number') {
      const numericValue = Number(fieldValue)
      if (isNaN(numericValue) || numericValue <= 0) {
        setErrorMessage(VALIDATION_MESSAGES.positiveNumber)
        return false
      }
    }

    return true
  }

  function handleNext() {
    if (!validateCurrentStep()) return

    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1)
      setErrorMessage('')
    } else {
      saveRecord(formData)
      navigate('/dashboard')
    }
  }

  function handleBack() {
    setCurrentStepIndex((prev) => prev - 1)
    setErrorMessage('')
  }

  return {
    currentStep,
    currentStepIndex,
    formData,
    errorMessage,
    isFirstStep,
    totalSteps: FORM_STEPS.length,
    handleFieldChange,
    handleNext,
    handleBack,
  }
}
