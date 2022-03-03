import React from 'react'
import InterviewerListItem from 'components/interviewerListItem'
import 'components/interviewerList.scss'

export default function InterviewerList (props) {
  const interviewerList = props.interviewers.map(interviewer =>
    <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      onClick={props.setInterviewer}
		/>
	)

  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>
        {interviewerList}
      </ul>
    </section>
  )
}
