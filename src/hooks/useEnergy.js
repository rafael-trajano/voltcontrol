import { useContext } from 'react'
import { EnergyContext } from '../context/EnergyContext'

/*
  useEnergy — hook customizado para acessar o contexto de energia.

  Em vez de importar useContext + EnergyContext em cada componente,
  basta importar useEnergy e já ter acesso a tudo.

  Uso:
    const { energyData, history, saveRecord, deleteFromHistory } = useEnergy()
*/

export function useEnergy() {
  const context = useContext(EnergyContext)
  if (!context) {
    throw new Error('useEnergy deve ser usado dentro de um EnergyProvider')
  }
  return context
}
