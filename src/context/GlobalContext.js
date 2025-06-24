import React from "react"

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModel: false,
  setShowEventModel: () => {},
  savedEvents:[],
  dispatchCalEvent:({type , payload})=>{}
});

export default GlobalContext