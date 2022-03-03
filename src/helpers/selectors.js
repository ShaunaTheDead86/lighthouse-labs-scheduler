export function getAppointmentsForDay (state, day) {
  const currentDay = state.days.filter(stateDay => stateDay.name === day)

  if (currentDay.length === 0) {
    return []
  }

  const results = currentDay[0].appointments.map(
		appointment => state.appointments[appointment]
	)

  return results
}

export function getInterview (state, interviewer) {
  const results = Object.values(state.interviewers).filter(stateInterviewer => {
    if (stateInterviewer !== null && interviewer !== null) {
      return stateInterviewer.id === interviewer.interviewer
    }
  })

  if (results.length === 0) {
    return null
  }

  return { interviewer: results[0], student: interviewer.student }
}

// {
//   "student": "Lydia Miller-Jones",
//   "interviewer": {
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }
