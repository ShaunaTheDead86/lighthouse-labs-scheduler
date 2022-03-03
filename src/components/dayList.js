import React from 'react'
import DayListItem from './dayListItem'

export default function DayList (props) {
  const parsedDayList = props.days.map(day =>
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={() => props.onChange(props.name)}
		/>
	)

  return (
    <ul>
      {parsedDayList}
    </ul>
  )
}
