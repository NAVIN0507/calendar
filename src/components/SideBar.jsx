import React from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar'

const SideBar = () => {
  return (
   <aside className='border p-5 w-64 border-gray-300'>
    <CreateEventButton/>
    <SmallCalendar/>
   </aside>
  )
}

export default SideBar