import React from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar'
import Tasks from './Tasks'

const SideBar = () => {
  return (
   <aside className='border p-5 w-64 border-gray-300'>
    <CreateEventButton/>
    <SmallCalendar/>
    <Tasks/>
   </aside>
  )
}

export default SideBar