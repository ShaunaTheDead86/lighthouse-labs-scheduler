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

    return promise
  }

  function cancelInterview (id) {
    const promise = axios.delete('/api/appointments/' + id)

    return promise
  }

  return { state, setDay, bookInterview, cancelInterview }
}
