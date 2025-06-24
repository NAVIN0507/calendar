import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import dayjs from 'dayjs';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CalendarHeader = () => {
  const {monthIndex , setMonthIndex} = useContext(GlobalContext);
  function handlePrevMonth(){
    setMonthIndex(monthIndex-1)
  }
  function handleNextMonth(){
    setMonthIndex(monthIndex+1)
  }
  function handleReset(){
    setMonthIndex(monthIndex ===  dayjs().month() ?  monthIndex + Math.random() : dayjs().month())
  }
  useGSAP(() => {
    gsap.fromTo(
      '.header-d',
      {
        x: 1000,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.05, // you can tweak this value
        duration: 2,
        ease: 'power2.out',
      }
    )
  }, [])
  return (
    <header className='px-4 py-2 flex items-center header-d'>
        <img src="/calendar.jpg" alt="logo" className='mr-2 w-12 h-12'/>
        <h1 className='mr-10  text-2xl text-gray-400 font-normal ml-2'>Calendar</h1>
        <button className='border rounded py-2 px-4 mr-5 border-gray-400 cursor-pointer' onClick={handleReset}>
            Today
        </button>
        <button className='cursor-pointer rounded-full hover:border border-gray-400 ease-in-out' onClick={()=>handlePrevMonth()}>
          <ChevronLeft color='#000000'/>
        </button>
        <button className='mx-4 cursor-pointer rounded-full hover:border border-gray-400 ease-in-out' onClick={()=>handleNextMonth()}>
          <ChevronRight color='#000000'/>
        </button>
        <h2 className='ml-4 text-xl text-gray-500'>
          {dayjs(new Date(dayjs().year() , monthIndex)).format("MMMM YYYY")}
        </h2>
    </header>
  )
}

export default CalendarHeader