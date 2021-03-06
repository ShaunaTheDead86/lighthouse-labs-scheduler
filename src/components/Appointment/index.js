import React from 'react'
import Header from 'components/Appointment/Header'
import Show from 'components/Appointment/Show'
import Empty from 'components/Appointment/Empty'
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status'
import Confirm from 'components/Appointment/Confirm'
import Error from 'components/Appointment/Error'
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
  const ERROR_SAVE = 'ERROR_SAVE'
  const ERROR_DELETE = 'ERROR_DELETE'

  const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	)

  function queueSave (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING)

    props
			.bookInterview(props.id, interview)
			.then(res => transition(SHOW))
			.catch(err => transition(ERROR_SAVE, true))
  }

  function queueDelete (id) {
    transition(DELETING, true)

    props
			.cancelInterview(id)
			.then(res => transition(EMPTY))
			.catch(err => transition(ERROR_DELETE, true))
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
        onSave={queueSave}
				/>}
      {mode === EDIT &&
      <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={queueSave}
				/>}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM &&
      <Confirm
        message='Are you sure you would like to delete?'
        onConfirm={() => queueDelete(props.id)}
        onCancel={() => back()}
				/>}
      {mode === ERROR_SAVE &&
      <Error
        message='There was an error while saving'
        onClose={() => back()}
				/>}
      {mode === ERROR_DELETE &&
      <Error
        message='There was an error while deleting'
        onClose={() => back()}
				/>}
    </article>
  )
}
