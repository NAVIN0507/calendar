import React from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar'
import Tasks from './Tasks'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import dayjs from 'dayjs'
import { CalendarDays } from 'lucide-react'

const SideBar = () => {
  useGSAP(() => {
    gsap.fromTo(
      '.sidbar',
      { y: 1000, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 1,
        duration: 2,
        ease: 'power2.out',
      }
    )
  }, [])

  const today = dayjs().format('dddd, MMMM D')

  return (
    <aside className="border p-5 w-74 border-gray-300 sidbar bg-white  shadow-sm space-y-6">
      <div className="flex items-center gap-2 text-gray-700">
        <CalendarDays />
        <div>
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-md font-medium">{today}</p>
        </div>
      </div>

      <hr className="border-gray-200" />

      <CreateEventButton />

      <hr className="border-gray-200" />

      <SmallCalendar />

      <hr className="border-gray-200" />

      <Tasks />

      <hr className="border-gray-200" />

    </aside>
  )
}

export default SideBar
