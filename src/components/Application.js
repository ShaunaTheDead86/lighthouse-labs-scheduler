import React from 'react'
import useApplicationData from 'hooks/useApplicationData'
import 'components/Application.scss'
import DayList from 'components/DayList'
import Appointment from './Appointment'
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay
} from 'helpers/selectors'

export default function Application (props) {
  const {
		state,
		setDay,
		bookInterview,
		cancelInterview
	} = useApplicationData()

	// grab the appointments for the current day
  const appointments = getAppointmentsForDay(state, state.day)

	// set a schedule variable to the map of appointments for the day
  const schedule = appointments.map(appointment => {
		// grab the interview for the day, or null if there isn't one
    const interview = getInterview(state, appointment.interview)
		// grab the interviewers for the day or an empty array if it can't find them
    const interviewers = getInterviewersForDay(state, state.day)

		// return an Appointment html render
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
			/>
    )
  })

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
				/>
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          {/* render the days menu */}
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
				/>
      </section>
      <section className='schedule'>
        {/* pass in the schedule variable created above that renders Appointments */}
        {schedule}
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  )
}
