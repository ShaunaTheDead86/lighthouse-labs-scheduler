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
