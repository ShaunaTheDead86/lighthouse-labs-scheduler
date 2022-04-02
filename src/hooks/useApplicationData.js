import { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';

export default function useApplicationData() {
	// assign state and setState variables
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {}
	});

	// create a function for setDay that sets the state
	const setDay = (day) => setState({ ...state, day });

	const targetURL = 'https://shauna-scheduler-api.herokuapp.com';

	// grab the data from the API server asyncronously
	useEffect(() => {
		Promise.all([
			axios.get(targetURL + '/api/days'),
			axios.get(targetURL + '/api/appointments'),
			axios.get(targetURL + '/api/interviewers')
		]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data
			}));
		});
	}, []);

	// function for updating the spots every time an inteview is created, edited, or deleted
	// takes add as a boolean value that tells us whether to add or remove a spot
	function updateSpots(add) {
		// map the days
		const days = state.days.map((day) => {
			// find the day that matches
			if (day.name === state.day) {
				// if add is true
				if (add) {
					// then add a spot to that day
					return { ...day, spots: day.spots + 1 };
				} else {
					// otherwise subtract a spot from that day
					return { ...day, spots: day.spots - 1 };
				}
			} else {
				// error catching in case the day is not found return the entire day state
				return { ...day };
			}
		});

		// return the days state
		return days;
	}

	// a function called when we create or edit an interview
	// takes the appointment id and the interview object as parameters
	function bookInterview(id, interview) {
		// set up an appointment object with the data passed in to bookInterview
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};

		// add the newly made appointment object to an appointments variable that uses the current state
		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		// make a put axios call
		const promise = axios
			.put('/api/appointments/' + id, { interview })
			.then((res) => {
				// call updateSpots and store the days state
				const days = updateSpots();
				// set the state using the updated appointments and days states
				setState((prev) => ({ ...prev, appointments, days }));
			});

		// the promise is returned to the queueSave function in src/components/Appointment/index.js
		// so that it can run additional local functions before resolving
		return promise;
	}

	// a function for cancelling interviews, called when an interview is deleted
	// takes an appointment id as an argument
	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null
		};
		// setup an appointment object using the current state,
		// but set the id passed in to null
		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		// create an axios delete request promise
		const promise = axios
			.delete(targetURL + '/api/appointments/' + id)
			.then((res) => {
				// create a days state by calling updateSpots with true as an argument because we want to add a spot
				const days = updateSpots(true);
				// set the state using previous state plus the appointment and days states created locally
				setState((prev) => ({ ...prev, appointments, days }));
			});

		// return the axios promise to the queueDelete function in src/components/Appointment/index.js
		// to be resolved there so that it can run local transition functions
		return promise;
	}

	return { state, setDay, bookInterview, cancelInterview };
}
