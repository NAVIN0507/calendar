import {
    Bookmark,
    CalendarCheckIcon,
    Clock,
    Menu,
    Trash,
    X,
    AlignRight,
    Check,
    Bell,
    BellOff,
    Tag
  } from 'lucide-react'
  import React, { useContext, useState } from 'react'
  import GlobalContext from '../context/GlobalContext'
  import dayjs from 'dayjs'
  
  const labelsClasses = ['red', 'gray', 'green', 'blue', 'purple']
  
  const labelColors = {
    red: 'bg-red-500',
    gray: 'bg-gray-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  }
  
  const priorities = {
    Low: 'text-green-600 border-green-300',
    Medium: 'text-yellow-600 border-yellow-300',
    High: 'text-red-600 border-red-300',
  }
  
  const EventModel = () => {
    const { setShowEventModel, daySelected, dispatchCalEvent, selectedEvent } = useContext(GlobalContext)
  
    const [title, setTitle] = useState(selectedEvent?.title || '')
    const [description, setDescription] = useState(selectedEvent?.description || '')
    const [selectedLabel, setSelectedLabel] = useState(
      selectedEvent ? labelsClasses.find((lbl) => lbl === selectedEvent.label) : labelsClasses[0]
    )
    const [priority, setPriority] = useState(selectedEvent?.priority || 'Medium')
    const [time, setTime] = useState(selectedEvent ? dayjs(selectedEvent.time).format('HH:mm') : '09:00')
    const [notify, setNotify] = useState(true)
    const [tags, setTags] = useState(selectedEvent?.tags || '')
  
    const handleSave = (e) => {
      e.preventDefault()
      const task = {
        title,
        description,
        label: selectedLabel,
        day: daySelected.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
        time: dayjs(`${daySelected.format('YYYY-MM-DD')}T${time}`).valueOf(),
        notify,
        priority,
        tags,
      }
      dispatchCalEvent({ type: selectedEvent ? 'update' : 'push', payload: task })
      setShowEventModel(false)
    }
  
    return (
      <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50 bg-black/30">
        <form className="bg-white rounded-lg shadow-lg w-[440px]">
          <header className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b border-gray-300">
            <Menu />
            <button type="button" onClick={() => setShowEventModel(false)} className="hover:bg-gray-200 p-1 rounded">
              <X />
            </button>
          </header>
  
          <div className="p-6 space-y-5">
            {/* Title */}
            <input
              type="text"
              placeholder="Add Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-lg font-semibold border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
            />
  
            {/* Date & Time */}
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarCheckIcon />
              <p>{daySelected.format('dddd, MMMM DD, YYYY')}</p>
              <Clock className="ml-4" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
  
            {/* Description */}
            <div className="flex items-start gap-3">
              <AlignRight className="mt-2 text-gray-500" />
              <textarea
                placeholder="Add a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
  
            {/* Label */}
            <div className="flex items-center gap-3">
              <Bookmark className="text-gray-500" />
              {labelsClasses.map((lb) => (
                <span
                  key={lb}
                  className={`${labelColors[lb]} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  onClick={() => setSelectedLabel(lb)}
                >
                  {selectedLabel === lb && <Check className="text-white w-4 h-4" />}
                </span>
              ))}
            </div>
  
          
  
            {/* Preview */}
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Task Summary</h3>
              <p className="text-gray-800 font-semibold">{title || 'Untitled Task'}</p>
              <p className="text-sm text-gray-600">{daySelected.format('ddd, MMM D')} at {time}</p>
              {description && <p className="text-sm text-gray-600 italic mt-1 line-clamp-2">{description}</p>}
              <p className="text-xs text-gray-500 mt-2">Priority: {priority}</p>
              {tags && <p className="text-xs text-gray-500">Tags: {tags}</p>}
            </div>
          </div>
  
          {/* Footer */}
          <footer className="flex justify-end gap-3 border-t border-gray-200 px-6 py-3">
            {selectedEvent && (
              <button
                type="button"
                onClick={() => dispatchCalEvent({ type: 'delete', payload: selectedEvent })}
                className="flex gap-2 items-center text-sm text-red-600 border border-red-400 rounded px-4 py-2 hover:bg-red-50"
              >
                <Trash size={16} /> Delete
              </button>
            )}
            <button
              type="submit"
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white text-sm font-medium"
            >
              Save
            </button>
          </footer>
        </form>
      </div>
    )
  }
  
  export default EventModel
  