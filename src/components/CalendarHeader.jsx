import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const CalendarHeader = () => {
  return (
    <header className='px-4 py-2 flex items-center'>
        <img src="/calendar.jpg" alt="logo" className='mr-2 w-12 h-12'/>
        <h1 className='mr-10  text-2xl text-gray-400 font-normal ml-2'>Calendar</h1>
        <button className='border rounded py-2 px-4 mr-5 border-gray-400'>
            Today
        </button>
        <button className='cursor-pointer rounded-full hover:border border-gray-400 ease-in-out'>
          <ChevronLeft color='#000000'/>
        </button>
        <button className='mx-4 cursor-pointer rounded-full hover:border border-gray-400 ease-in-out'>
          <ChevronRight color='#000000'/>
        </button>
    </header>
  )
}

export default CalendarHeader