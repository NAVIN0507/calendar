import { Bookmark, CalendarCheckIcon, Clock, Menu, X } from 'lucide-react'
import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { AlignRight , Check } from 'lucide-react'
const labelsClasses = [
    'red',
    'gray',
    'green',
    'blue',
    'purple'
]
const labelColors = {
    red: 'bg-red-500',
    gray: 'bg-gray-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };
  
const EventModel = () => {
    const {setShowEventModel , daySelected , dispatchCalEvent , selectedEvent}  = useContext(GlobalContext);
    const [title, settitle] = useState(selectedEvent ? selectedEvent.title : '');
    const [description, setdescription] = useState(selectedEvent ? selectedEvent.description :'');
    const [selectedLabel, setselectedLabel] = useState(labelsClasses[0])
    function handleSave(){
        const task = {
            title,
            description,
            label:selectedLabel,
            day:daySelected.valueOf(),
            id:Date.now(),
            time: new Date().getTime()
        }
        dispatchCalEvent({type:'push' , payload:task})
        setShowEventModel(false)
    }
  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
        <form action="" className='bg-white rounded-lg shadow-lg w-1/4'>
        <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
            <span className=''>
                <Menu/>
            </span>
            <button onClick={()=>setShowEventModel(false)} className='cursor-pointer'>
                <span>
                    <X/>
                </span>
            </button>
        </header>
        <div className='p-7 -mt-4'>
            <div className='grid grid-cols-1/5 items-end gap-y-7'>
            <div></div>
            <input type="text" name='title' placeholder='Add Task' value={title} onChange={(e)=>settitle(e.target.value)} className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'/>
            <div className='flex gap-2'>
            <span className=''>
                <CalendarCheckIcon/>
            </span>
            <p>{daySelected.format('dddd, MMMM DD')}</p>
            </div>
            <div className='flex gap-4'>
            <AlignRight className='mt-3'/>
            <input type="text" name='description' placeholder='Add a description' value={description} onChange={(e)=>setdescription(e.target.value)} className='pt-3 border-0 text-gray-600  font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'/>
            </div>
            <div className='flex gap-4'>
            <Bookmark className='mt-3'/>
         <div className='mt-3 flex gap-3'>
{labelsClasses.map((lb) => (
  <span
    key={lb}
    className={`${labelColors[lb]} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
    onClick={()=>setselectedLabel(lb)}
  >
    {selectedLabel === lb    &&  (<Check className="text-white w-4 h-4" />) }

  </span>
))}
</div>
            </div>
            </div>
        </div>
        <footer className='flex justify-end border-t border-gray-300 p-3 mt-5'>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white' onClick={handleSave}>Save  </button>
        </footer>
        </form>
    </div>
  )
}

export default EventModel