import { SparkleIcon, SparklesIcon } from 'lucide-react'
import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const CreateEventButton = () => {
    const {setShowEventModel}  = useContext(GlobalContext)
  return (
    <button className='border p-3 w-50 border-gray-400 gap-3 rounded-full flex items-center shadow-md  hover:shadow-2xl cursor-pointer' onClick={()=>setShowEventModel(true)}>
        <SparklesIcon color='#b08e15' /> Create Task
    </button>
  )
}

export default CreateEventButton