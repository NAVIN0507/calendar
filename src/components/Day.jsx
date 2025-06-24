import dayjs from 'dayjs'

import { CornerDownRight } from 'lucide-react';
import React, { useContext , useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
const labelColors = {
  red: 'bg-red-300',
  gray: 'bg-gray-300',
  green: 'bg-green-300',
  blue: 'bg-blue-300',
  purple: 'bg-purple-300',
};
const Day = ({day , rowIdx}) => {

  const {setDaySelected , setShowEventModel ,filteredEvents , setSelectedEvent}  = useContext(GlobalContext);
  const [dayEvents, setdayEvents] = useState([]);
  useEffect(()=>{
    const events  = filteredEvents.filter((evt)=>dayjs(evt.day).format("DD-MM-YY")===day.format("DD-MM-YY"))
    setdayEvents(events)
  } , [filteredEvents])
    const getCurrentDateClass = ()=>{
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ?  'bg-blue-500 text-white rounded-full w-7' :''
    }
  
  return (
    <div className='border border-gray-200 flex flex-col'>
        <header className='flex flex-col items-center'>
            {rowIdx===0 &&   <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p> }
          
     <p className={`text-sm p-1 my-1 text-center ${getCurrentDateClass()}`}>
        {day.format('DD')}
     </p>
     </header>
     <div className='flex-1 cursor-pointer ml-1' onClick={()=>{
      setDaySelected(day)
      setShowEventModel(true)

     }}>
      {dayEvents.map((evt , idx)=>(
        <div key={idx}
        onClick={()=>setSelectedEvent(evt)}
        className={`${labelColors[evt.label]} p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate w-11/12 h-14 day-event`} id='days'>
          {evt.title}
        <span className='flex gap-2 ml-2'>  <CornerDownRight /> {evt.description} </span>
        </div>
      ))}
     </div>
    </div>
  )
}

export default Day