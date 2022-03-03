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
    return null
  })

  if (results.length === 0) {
    return null
  }

  return { interviewer: results[0], student: interviewer.student }
}

export function getInterviewersForDay (state, day) {
  const appointments = getAppointmentsForDay(state, day)

  if (appointments.length === 0) {
    return []
  }

  const interviewerIDs = []

  for (const appointment of appointments) {
    if (appointment.interview !== null) {
      interviewerIDs.push(appointment.interview.interviewer)
    }
  }

  const results = Object.values(state.interviewers).filter(interviewer =>
		interviewerIDs.includes(interviewer.id)
	)

  return results
}
