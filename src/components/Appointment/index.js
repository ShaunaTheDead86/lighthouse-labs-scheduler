import React from 'react'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status'
import useVisualMode from 'hooks/useVisualMode'

import 'components/Appointment/styles.scss'

export default function Appointment (props) {
  const EMPTY = 'EMPTY'
  const SHOW = 'SHOW'
  const CREATE = 'CREATE'
  const EDIT = 'EDIT'
  const STATUS = 'STATUS'

  const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	)

  function save (name, interviewer) {
    transition(STATUS)

    const interview = {
      student: name,
      interviewer
    }

    const promise = props.bookInterview(props.id, interview)
    promise.then(res => transition(SHOW)).catch(err => console.log(err))
  }

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
      <Show
        student={props.interview !== null ? props.interview.student : ''}
        interviewer={
						props.interview !== null ? props.interview.interviewer : ''
					}
				/>}
      {mode === CREATE &&
      <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onConfirm={save}
				/>}
      {mode === EDIT &&
      <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onConfirm={save}
				/>}
      {mode === STATUS && <Status message='Saving' />}
    </article>
  )
}
