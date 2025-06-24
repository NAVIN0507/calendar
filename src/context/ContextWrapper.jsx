import React, { useEffect, useState } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month())
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs())
  const [showEventModel, setShowEventModel] = useState(false)
  useEffect(()=>{
    if(smallCalendarMonth!==null){
      setMonthIndex(smallCalendarMonth)
    }
  } , [smallCalendarMonth])
  return (
    <GlobalContext.Provider value={{monthIndex , setMonthIndex  , smallCalendarMonth , setSmallCalendarMonth , daySelected , setDaySelected , showEventModel , setShowEventModel}}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default ContextWrapper