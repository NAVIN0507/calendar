import React, { useState  , useContext, useEffect} from 'react'
import { getMonth } from './lib/utils'
import CalendarHeader from './components/CalendarHeader'
import SideBar from './components/SideBar'
import Month from './components/Month'
import GlobalContext from './context/GlobalContext'
import EventModel from './components/EventModel'
import RightSideBar from './components/RightSideBar'
import gsap from 'gsap'
import { ScrollTrigger , SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger , SplitText)
const App = () => {
  
  const [currentMonth, setcurrentMonth] = useState(getMonth())
  const {monthIndex , showEventModel}  =useContext(GlobalContext)
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth(); // Get initial width

    window.addEventListener("resize", updateWidth); // Listen for resize
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  useEffect(()=>{
    setcurrentMonth(getMonth(monthIndex))
  } , [monthIndex])
  
  return (
    <>
    {showEventModel && <EventModel/>}
  <div className="h-screen flex flex-col"> 
  <CalendarHeader/>
    <div className='flex flex-1'>
      {width > 767 && <SideBar/>}
      <Month month={currentMonth}/>
      <RightSideBar/>
    </div>
 
  </div>
  </>
  )
}

export default App