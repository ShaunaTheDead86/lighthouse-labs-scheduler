import React, { useState } from 'react'

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
    const newHistory = history.slice(0, history.length - 1)

    setHistory(newHistory)

    if (newHistory.length !== 0) {
      setMode(newHistory[newHistory.length - 1])
    } else {
      setMode(history[0])
    }
  }

  return { mode, transition, back }
}
