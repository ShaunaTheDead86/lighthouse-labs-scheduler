import { useState, useEffect } from 'react'
import axios from 'axios'

import 'components/Application.scss'

export default function useApplicationData () {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day })
	// const setDays = days => setState(prev => ({ ...prev, days }))

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, [])

  function updateSpots () {
    const interviews = []

    for (const appointment of Object.values(state.appointments)) {
      if (appointment.interview !== null) {
        interviews.push(appointment.id)
      }
    }

    for (const day of state.days) {
      let spots = { spots: 5 }
      for (const appointment of day.appointments) {
        if (interviews.includes(appointment)) {
          spots.spots--
        }
      }

      setState(prev => ({ ...prev, spots }))
    }
  }

  function bookInterview (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const promise = axios
			.put('/api/appointments/' + id, { interview })
			.then(res =>
				setState({
  ...state,
  appointments
})
			)
			.then(updateSpots())

    return promise
  }

  function cancelInterview (id) {
    const promise = axios.delete('/api/appointments/' + id).then(updateSpots())

    return promise
  }

  return { state, setDay, bookInterview, cancelInterview }
}
