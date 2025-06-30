import React, { useState, useContext, useEffect } from 'react';
import { getMonth } from './lib/utils';
import CalendarHeader from './components/CalendarHeader';
import SideBar from './components/SideBar';
import Month from './components/Month';
import GlobalContext from './context/GlobalContext';
import EventModel from './components/EventModel';
import RightSideBar from './components/RightSideBar';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModel } = useContext(GlobalContext);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModel && <EventModel />}
      <div className="h-screen flex flex-col overflow-hidden">
        <CalendarHeader />
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar on medium screens and above */}
          {width >= 768 && (
            <div className="md:w-[250px] overflow-y-auto bg-gray-100">
              <SideBar />
            </div>
          )}

          {/* Main calendar content */}
          <div className="flex-1 overflow-y-auto">
            <Month month={currentMonth} />
          </div>

          {/* Right sidebar on medium screens and above */}
          {width >= 768 && (
            <div className="md:w-[250px] overflow-y-auto bg-gray-100">
              <RightSideBar />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
