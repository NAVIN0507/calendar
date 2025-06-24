import React, { useState  , useContext, useEffect} from 'react'
import { getMonth } from './lib/utils'
import CalendarHeader from './components/CalendarHeader'
import SideBar from './components/SideBar'
import Month from './components/Month'
import GlobalContext from './context/GlobalContext'
import EventModel from './components/EventModel'

const App = () => {
  
  const [currentMonth, setcurrentMonth] = useState(getMonth())
  const {monthIndex , showEventModel}  =useContext(GlobalContext)
  useEffect(()=>{
    setcurrentMonth(getMonth(monthIndex))
  } , [monthIndex])
  return (
    <>
    {showEventModel && <EventModel/>}
  <div className="h-screen flex flex-col"> 
  <CalendarHeader/>
    <div className='flex flex-1'>
      <SideBar/>
      <Month month={currentMonth}/>
    </div>
  </div>
  </>
  )
}

export default App