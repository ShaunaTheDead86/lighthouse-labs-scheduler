import React from 'react'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status'
import Confirm from 'components/Appointment/Confirm'
import useVisualMode from 'hooks/useVisualMode'

import 'components/Appointment/styles.scss'

export default function Appointment (props) {
  const EMPTY = 'EMPTY'
  const SHOW = 'SHOW'
  const CREATE = 'CREATE'
  const EDIT = 'EDIT'
  const SAVING = 'SAVING'
  const DELETING = 'DELETING'
  const CONFIRM = 'CONFIRM'

  const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	)

  function queueSave (name, interviewer) {
    transition(SAVING)

    const interview = {
      student: name,
      interviewer
    }

    const promise = props.bookInterview(props.id, interview)
    promise.then(res => transition(SHOW)).catch(err => console.log(err))
  }

  function queueDelete (id) {
    transition(DELETING)

    const promise = props.deleteInterview(props.id)

    promise.then(res => transition(EMPTY)).catch(err => console.log(err))
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
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
				/>}
      {mode === CREATE &&
      <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onConfirm={queueSave}
				/>}
      {mode === EDIT &&
      <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onConfirm={queueSave}
				/>}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM &&
      <Confirm
        message='Are you sure you would like to delete?'
        onConfirm={() => queueDelete(props.id)}
        onCancel={() => back()}
				/>}
    </article>
  )
}
