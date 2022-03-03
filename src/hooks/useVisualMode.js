import { useState } from 'react'

export default function useVisualMode (initialMode) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode])

  function transition (newMode, replace) {
    if (replace) {
      const currentHistory = history.slice(0, history.length - 1)
      setHistory(currentHistory)
      setMode(newMode)
    } else {
      setHistory(prev => [...prev, newMode])
      setMode(newMode)
    }
  }

  function back () {
    const newHistory = history.slice()

    if (newHistory.length > 1) {
      newHistory.pop()
      setMode(newHistory[newHistory.length - 1])
    } else {
      setMode(history[0])
    }

    setHistory(newHistory)
  }

  return { mode, transition, back }
}
