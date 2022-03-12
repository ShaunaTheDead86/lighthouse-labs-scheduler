import { useState } from 'react'

export default function useVisualMode (initialMode) {
  const [mode, setMode] = useState(initialMode)
  const [history, setHistory] = useState([initialMode])

	// a function for transitioning between modes and tracking the history
  function transition (newMode, replace) {
		// first, set the new mode
    setMode(newMode)

		// if replace is passed in then we want to replace the previous mode with the new mode
    if (replace) {
			// set history using previous state minus the last entry, then append the new mode
      setHistory(prev => [...prev.slice(0, -1), newMode])
    } else {
			// otherwise just append the new mode to the previous state as normal
      setHistory(prev => [...prev, newMode])
    }
  }

	// a function for returning to the previous history state
  function back () {
		// check if the array has more than one entry
    if (history.length > 1) {
			// then set the current mode to the previous entry
      setMode(history[history.length - 2])
    } else {
			// otherwise set the current mode to the first (and only) entry in history
			// this is mostly error catching, but it could happen when using replace = true in transition incorrectly
      setMode(history[0])
    }

		// set the history using the previous history minus the last entry
    setHistory(prev => [...prev.slice(0, -1)])
  }

	// return the functions so they can be used in the application
  return { mode, transition, back }
}
