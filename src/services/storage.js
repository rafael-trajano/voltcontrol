// storage.js — persistência com LocalStorage

const KEYS = {
  ENERGY_DATA: 'voltcontrol:energyData',
  HISTORY: 'voltcontrol:history',
}

export function saveEnergyData(data) {
  localStorage.setItem(KEYS.ENERGY_DATA, JSON.stringify(data))
}

export function loadEnergyData() {
  try {
    const raw = localStorage.getItem(KEYS.ENERGY_DATA)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveHistory(history) {
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(history))
}

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEYS.HISTORY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function clearAllData() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key))
}
