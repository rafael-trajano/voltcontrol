import { useState, useEffect, useMemo, useCallback } from 'react'
import { EnergyContext } from './EnergyContext'
import { saveEnergyData, loadEnergyData, saveHistory, loadHistory } from '../services/storage'

function EnergyProvider({ children }) {
  const [energyData, setEnergyDataState] = useState(() => loadEnergyData())
  const [history, setHistory] = useState(() => loadHistory())

  useEffect(() => {
    if (energyData) saveEnergyData(energyData)
  }, [energyData])

  useEffect(() => {
    saveHistory(history)
  }, [history])

  // Adiciona nova conta ou substitui se o mês já existir
  const saveRecord = useCallback((data) => {
    const exists = history.some((r) => r.billMonth === data.billMonth)
    if (exists) {
      setHistory((prev) =>
        prev.map((r) => r.billMonth === data.billMonth ? { ...data, id: r.id } : r)
      )
    } else {
      setHistory((prev) => [...prev, { ...data, id: Date.now() }])
    }
    setEnergyDataState(data)
  }, [history])

  const deleteFromHistory = useCallback((id) => {
    setHistory((prev) => prev.filter((r) => r.id !== id))
  }, [])
  
  const contextValue = useMemo(
    () => ({
      energyData,
      history,
      saveRecord,
      deleteFromHistory,
    }),
    [energyData, history, saveRecord, deleteFromHistory]
 )

  return (
    <EnergyContext.Provider value={contextValue}>
      {children}
    </EnergyContext.Provider>
  )
}

export default EnergyProvider
