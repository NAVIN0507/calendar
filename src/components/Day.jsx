import dayjs from 'dayjs'
import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const Day = ({day , rowIdx}) => {
  const {setDaySelected , setShowEventModel}  = useContext(GlobalContext)
    const getCurrentDateClass = ()=>{
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ?  'bg-blue-500 text-white rounded-full w-7' :''
    }
  return (
    <div className='border border-gray-200 flex flex-col'>
        <header className='flex flex-col items-center'>
            {rowIdx===0 &&   <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p> }
          
     <p className={`text-sm p-1 my-1 text-center ${getCurrentDateClass()}`}>
        {day.format('DD')}
     </p>
     </header>
     <div className='flex-1 cursor-pointer' onClick={()=>{
      setDaySelected(day)
      setShowEventModel(true)
     }}>

     </div>
    </div>
  )
}

export default Day