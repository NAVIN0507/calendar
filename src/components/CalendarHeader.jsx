import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import dayjs from 'dayjs';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  // GSAP animation
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
    );
  }, []);

  const startOfMonth = dayjs(new Date(dayjs().year(), monthIndex))
    .startOf('month')
    .startOf('week');
  const endOfMonth = dayjs(new Date(dayjs().year(), monthIndex))
    .endOf('month')
    .endOf('week');
  const weekRange = `${startOfMonth.format('ddd, MMM D')} - ${endOfMonth.format('ddd, MMM D')}`;

  return (
    <header className="px-4 py-3 bg-white shadow-sm rounded-md header-d">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Left: Logo and Week Range */}
        <div className="flex items-center gap-3">
          <img src="/calendar.jpg" alt="logo" className="w-10 h-10 rounded object-cover" />
          <div>
            <h1 className="text-xl md:text-2xl text-gray-800 font-semibold">Calendar</h1>
            <p className="text-xs md:text-sm text-gray-500">{weekRange}</p>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex flex-wrap items-center justify-center md:justify-start">
          <button
            title="Go to today"
            className="border rounded py-1.5 px-3 text-xs md:text-sm mr-2 mb-2 md:mb-0 border-gray-300 hover:bg-gray-100 transition"
            onClick={handleReset}
          >
            Today
          </button>
          <button
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            onClick={handlePrevMonth}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 mx-2 transition"
            onClick={handleNextMonth}
          >
            <ChevronRight size={18} />
          </button>
          <h2 className="ml-2 text-sm md:text-lg text-gray-700 font-medium mt-1 md:mt-0">
            {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
          </h2>
        </div>

        {/* Right: Placeholder for user section */}
        <div className="flex items-center gap-3">
          {/* Add user avatar or login dropdown here */}
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
