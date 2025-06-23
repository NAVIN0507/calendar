import React, { useState } from 'react'
import { getMonth } from './lib/utils'
import CalendarHeader from './components/CalendarHeader'
import SideBar from './components/SideBar'
import Month from './components/Month'

const App = () => {
  console.table(getMonth())
  const [currentMonth, setcurrentMonth] = useState(getMonth())

  return (
  <div className="h-screen flex flex-col"> 
  <CalendarHeader/>
    <div className='flex flex-1'>
      <SideBar/>
      <Month month={currentMonth}/>
    </div>
  </div>
  )
}

export default App