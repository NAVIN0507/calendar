import React from 'react'
import CreateEventButton from './CreateEventButton'
import SmallCalendar from './SmallCalendar'
import Tasks from './Tasks'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const SideBar = () => {
  useGSAP(() => {
    gsap.fromTo(
      '.sidbar',
      {
        y: 1000,
        opacity: 0,
        stagger:1
      },
      {
        y: 0,
        opacity: 1,
        stagger: 1, // you can tweak this value
        duration: 2,
        ease: 'power2.out',
      }
    )
  }, [])
  return (
   <aside className='border p-5 w-64 border-gray-300 sidbar'>
    <CreateEventButton/>
    <SmallCalendar/>
    <Tasks/>
   </aside>
  )
}

export default SideBar