import React, { useState } from 'react'
import Calendar from 'react-calendar'
import  "./calendar.module.css"

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarComponent = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <Calendar onChange={onChange} value={value} />
  )
}

export default CalendarComponent