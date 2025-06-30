import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { CornerDownRight, CalendarClock } from 'lucide-react'
import dayjs from 'dayjs'
import SmallCalendar from './SmallCalendar'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
const labelColors = {
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-800',
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
}

const RightSideBar = () => {
  const { savedEvents, setShowEventModel, setSelectedEvent } = useContext(GlobalContext)
  const [dayEvents, setDayEvents] = useState([])

  useEffect(() => {
    setDayEvents(savedEvents)
  }, [savedEvents])
useGSAP(() => {
    gsap.fromTo(
      '.sidbar',
      { y: 1000, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 1,
        duration: 1,
        ease: 'power2.out',
      }
    )
  }, [])
  return (
    <section className="w-74 bg-white border border-gray-200 p-6 rounded-xl shadow-md flex flex-col h-full sidbar">
      {/* Fixed Header */}
      <div className="flex items-center gap-2 mb-2">
        <CalendarClock className="text-gray-500" size={22} />
        <h1 className="text-2xl font-semibold text-gray-800">My Tasks</h1>
      </div>

      <p className="text-sm text-gray-500 mb-4">Upcoming events for this month</p>
      <hr className="border-gray-200 mb-4" />

      {/* Scrollable Task Section */}
      <div className="flex-1 overflow-y-auto pr-1 mb-6">
        <div className="space-y-4">
          {dayEvents.length === 0 ? (
            <p className="text-gray-400 italic text-sm">No tasks scheduled yet. Start by adding one.</p>
          ) : (
            dayEvents.map((evt, idx) => (
              <div
                key={idx}
                className={`${labelColors[evt.label] || 'bg-gray-100 text-gray-800'}
                  p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200
                  cursor-pointer`}
                onClick={() => {
                  setShowEventModel(true)
                  setSelectedEvent(evt)
                }}
              >
                <p className="font-medium truncate">{evt.title}</p>
                {evt.description && (
                  <span className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                    <CornerDownRight size={16} /> {evt.description}
                  </span>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {dayjs(evt.day).format('ddd, MMM D')}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Fixed Bottom Calendar */}
      <SmallCalendar />

      <div className="mt-6" />
    </section>
  )
}

export default RightSideBar
