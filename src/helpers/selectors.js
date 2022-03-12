// a function for getting all of the appointments for a specific day
export function getAppointmentsForDay (state, day) {
	// get the current day by searching state
  const currentDay = state.days.find(stateDay => stateDay.name === day)

	// error catching in case the current day doesn't exist return an empty array
  if (!currentDay) {
    return []
  }

	// set the results equal to a map of the day's appointments from state
  const results = currentDay.appointments.map(
		appointment => state.appointments[appointment]
	)

	// return the results array
  return results
}

// a function for getting a specific interview
export function getInterview (state, interviewer) {
	// filter state.interviewers
  const results = Object.values(state.interviewers).filter(stateInterviewer => {
		// check that the filtered result isn't null and the interviewer argument isn't null
    if (stateInterviewer !== null && interviewer !== null) {
			//  return true or false whether the filtered interviewer is the same interviewer that was passed in as an argument
      return stateInterviewer.id === interviewer.interviewer
    }
		// otherwise return null
    return null
  })

	// if nothing was returned from the filter, return null
  if (results.length === 0) {
    return null
  }

	// otherwise return a new object containing interview data
  return { interviewer: results[0], student: interviewer.student }
}

// get all the interviewers for a given day
export function getInterviewersForDay (state, day_name) {
	// get the current day from state
  const currentDay = state.days.find(day => day.name === day_name)

	// error checking if the current day doesn't exist or the current day doesn't have any interviewers assigned
  if (!currentDay || !currentDay.interviewers) {
		// then return an empty array
    return []
  }

	// otherwise, map the current day's interviewers to results
  const results = currentDay.interviewers.map(
		interviewer => state.interviewers[interviewer]
	)

	// and return results
  return results
}
