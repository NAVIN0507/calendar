import { ChevronLeft, ChevronRight, User } from 'lucide-react'
import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import dayjs from 'dayjs'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext)

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1)
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1)
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    )
  }

  // Animation
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
        stagger: 0.05,
        duration: 2,
        ease: 'power2.out',
      }
    )
  }, [])

  // Week range text
  const startOfMonth = dayjs(new Date(dayjs().year(), monthIndex)).startOf('month').startOf('week')
  const endOfMonth = dayjs(new Date(dayjs().year(), monthIndex)).endOf('month').endOf('week')
  const weekRange = `${startOfMonth.format('ddd, MMM D')} - ${endOfMonth.format('ddd, MMM D')}`

  return (
    <header className="px-4 py-3 flex justify-between items-center header-d bg-white shadow-sm rounded-md">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <img src="/calendar.jpg" alt="logo" className="w-12 h-12 rounded" />
        <div>
          <h1 className="text-2xl text-gray-800 font-semibold">Calendar</h1>
          <p className="text-sm text-gray-500">{weekRange}</p>
        </div>
      </div>

      {/* Middle section */}
      <div className="flex items-center">
        <button
          title="Go to today"
          className="border rounded py-2 px-4 mr-4 text-sm border-gray-300 hover:bg-gray-100 transition"
          onClick={handleReset}
        >
          Today
        </button>
        <button
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          onClick={handlePrevMonth}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 mx-3 transition"
          onClick={handleNextMonth}
        >
          <ChevronRight size={20} />
        </button>
        <h2 className="ml-2 text-lg text-gray-700 font-medium">
          {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
        </h2>
      </div>

      {/* Right section (User) */}
      <div className="flex items-center gap-3 pr-2">
       </div>
    </header>
  )
}

export default CalendarHeader
