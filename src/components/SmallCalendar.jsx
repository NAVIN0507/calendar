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
      const {monthIndex}  = useContext(GlobalContext)
      useEffect(()=>{
        setcurrentMonthIdx(monthIndex)
      } , [monthIndex]);
      
  return (
    <div className='mt-9'>
        <header className='flex justify-between'>
            <p className='text-gray-500 font-bold'>{dayjs(new Date(dayjs().year() , currentMonthIdx)).format('MMMM YYYY')}</p>
            <button className='cursor-pointer rounded-full hover:border border-gray-400 ease-in-out' onClick={handlePrevMonth}>
          <ChevronLeft color='#000000'/>
        </button>
        <button className='mx-4 cursor-pointer rounded-full hover:border border-gray-400 ease-in-out' onClick={handleNextMonth}>
          <ChevronRight color='#000000'/>
        </button>
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
                    <button key={idx} className={`py-1 w-full`}>
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