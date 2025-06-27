import dayjs from 'dayjs'
import { CornerDownRight, CalendarCheck2, Info } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext'

const labelColors = {
  red: 'bg-red-300',
  gray: 'bg-gray-300',
  green: 'bg-green-300',
  blue: 'bg-blue-300',
  purple: 'bg-purple-300',
}

const Day = ({ day, rowIdx }) => {
  const { setDaySelected, setShowEventModel, filteredEvents, setSelectedEvent } =
    useContext(GlobalContext)

  const [dayEvents, setdayEvents] = useState([])

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    )
    setdayEvents(events)
  }, [filteredEvents, day])

  const getCurrentDateClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-500 text-white rounded-full w-7'
      : ''
  }

  const isWeekend = day.format('ddd') === 'Sat' || day.format('ddd') === 'Sun'

  return (
    <div className={`border border-gray-200 flex flex-col px-1 pb-1 ${isWeekend ? 'bg-gray-50' : ''}`}>
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 font-medium text-gray-500">{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDateClass()}`}>
          {day.format('DD')}
        </p>
        {dayEvents.length > 0 && (
          <span className="text-xs text-gray-400">
            {dayEvents.length} task{dayEvents.length > 1 ? 's' : ''}
          </span>
        )}
      </header>

      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day)
          setShowEventModel(true)
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            title={evt.description}
            className={`${labelColors[evt.label]} p-2 mr-2 text-gray-700    text-sm rounded-md mb-1 w-full h-auto shadow-sm hover:shadow-md transition-all duration-200 truncate`}
          >
            <div className="flex items-center gap-2">
              <CalendarCheck2 size={16} />
              <span className="font-medium truncate">{evt.title}</span>
            </div>
            {evt.description && (
              <span className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                <CornerDownRight size={14} />
                {evt.description}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Day
