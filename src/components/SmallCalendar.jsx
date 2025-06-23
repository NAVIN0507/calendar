import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from '../lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import GlobalContext from '../context/GlobalContext'
const SmallCalendar = () => {
    const [currentMonthIdx, setcurrentMonthIdx] = useState(dayjs().month())
    const [currentMonth, setcurrentMonth] = useState(getMonth())
    useEffect(()=>{
        setcurrentMonth(getMonth(currentMonthIdx))
    } , [currentMonthIdx]);
    function handlePrevMonth() {
        setcurrentMonthIdx(currentMonthIdx - 1);
      }
      function handleNextMonth() {
        setcurrentMonthIdx(currentMonthIdx + 1);
      }
      const {monthIndex , setSmallCalendarMonth , setDaySelected , daySelected}  = useContext(GlobalContext)
      useEffect(()=>{
        setcurrentMonthIdx(monthIndex)
      } , [monthIndex]);
      function getDayClass(day){
        const format = "DD-MM-YY";
        const today = dayjs().format(format);
        const currday = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if(today === currday)
            return 'bg-blue-500 text-white rounded-full'
        else if(currday === slcDay)
            return "bg-blue-100 rounded-full text-blue-600 font-bold"
        else return ""
      }
  return (
    <div className='mt-9'>
        <header className='flex justify-between'>
            <p className='text-gray-500 font-bold'>{dayjs(new Date(dayjs().year() , currentMonthIdx)).format('MMMM YYYY')}</p>
           <div>
           <button className='cursor-pointer rounded-full hover:border border-gray-400 ease-in-out' onClick={handlePrevMonth}>
          <ChevronLeft color='#000000'/>
        </button>
        <button className='mx-4 cursor-pointer rounded-full hover:border border-gray-400 ease-in-out' onClick={handleNextMonth}>
          <ChevronRight color='#000000'/>
        </button>
           </div>
        </header>
     <div className='grid grid-cols-7 grid-rows-6 mt-7 '>
        {currentMonth[0].map((day , i)=>(
            <span key={i} className='text-sm py-1 text-center'>
                {day.format('dd').charAt(0)}
            </span>
        ))}
        {currentMonth.map((row , i)=>(
            <React.Fragment key={i}>
                {row.map((day , idx)=>(
                    <button key={idx} className={`py-1 w-full ${getDayClass(day)} cursor-pointer`}
                    onClick={()=>{
                        setSmallCalendarMonth(currentMonthIdx)
                        setDaySelected(day)
                    }}
                    >
                        <span className='text-sm'>{day.format('D')}</span>
                    </button>
                ))}
            </React.Fragment>
        ))}
     </div>
    </div>
  )
}

export default SmallCalendar