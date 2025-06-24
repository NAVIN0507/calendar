import React, { useEffect, useMemo, useReducer, useState } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'
function savedEventsReducer(state , {type , payload}){
  switch(type){
    case "push":
      return [...state , payload]
    case "update":
      return state.map(evt =>evt.id === payload.id ? payload : evt)
    case "delete":
        return state.filter(evt =>evt.id !== payload.id)
    default:
      throw new Error();
  }
}
function initEvents(){
  const storageEvents = localStorage.getItem('savedEvents')
  const parsedEvents =  storageEvents ? JSON.parse(storageEvents) : []
  return parsedEvents
}
const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month())
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs())
  const [showEventModel, setShowEventModel] = useState(false);
  const [savedEvents , dispatchCalEvent]  = useReducer(savedEventsReducer , [] , initEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const filteredEvents  = useMemo(()=>{
     return savedEvents.filter((evt)=>
    tasks.filter((lbl)=>lbl.checked).map((lbl)=>lbl.label).includes(evt.label))
  } , [savedEvents , tasks])
  useEffect(()=>{
    localStorage.setItem("savedEvents" , JSON.stringify(savedEvents))
  } , [savedEvents])
  useEffect(()=>{
    setTasks((pre)=>{
      return [...new Set(savedEvents.map(evt => evt.label))].map(label =>{
        const curr =  pre.find(lbl=>lbl.label === label)
        return{
          label,
          checked:curr ? curr.checked : true
        }
      })
    })
  } , [savedEvents])
  useEffect(()=>{
    if(!showEventModel){
      setSelectedEvent(null)
    }
  } , [showEventModel])
  useEffect(()=>{ 
    if(smallCalendarMonth!==null){
      setMonthIndex(smallCalendarMonth)
    }
  } , [smallCalendarMonth]);
  function updateTask(label){
    setTasks(tasks.map((lbl)=>lbl.label === label.label ? label : lbl))
  }
  return (
    <GlobalContext.Provider value={{monthIndex , setMonthIndex  , smallCalendarMonth , setSmallCalendarMonth , daySelected , setDaySelected , showEventModel , setShowEventModel , dispatchCalEvent , savedEvents , selectedEvent , setSelectedEvent ,  tasks , setTasks , updateTask , filteredEvents}}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default ContextWrapper