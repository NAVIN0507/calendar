import { PlusIcon, SparkleIcon, SparklesIcon } from 'lucide-react'
import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const CreateEventButton = () => {
    const {setShowEventModel}  = useContext(GlobalContext)
  return (
    <button className='border p-3 w-50 border-gray-400 gap-3 rounded-lg flex items-center shadow-md  hover:shadow-2xl cursor-pointer' onClick={()=>setShowEventModel(true)}>
        <PlusIcon className=' w-7 h-7 rounded-full'/> Add Task
    </button>
  )
}

export default CreateEventButton