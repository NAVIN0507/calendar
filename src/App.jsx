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
import { Menu, X } from 'lucide-react'; // Optional: For better icons

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModel } = useContext(GlobalContext);
  const [width, setWidth] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

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
      <div className="h-screen flex flex-col overflow-hidden relative">
        <CalendarHeader />

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          {/* Sidebar for medium+ screens */}
          {width >= 768 && <SideBar />}

          {/* Sidebar for mobile toggle */}
          {width < 768 && showSidebar && (
            <div className="absolute  bg-white shadow-md h-full w-64 p-4">
              <SideBar />
            </div>
          )}

          {/* Main calendar */}
     
            <Month month={currentMonth} />
          

          {/* Right Sidebar */}
          {width >= 768 && (
            <div className=" bg-gray-100">
              <RightSideBar />
            </div>
          )}
        </div>

        {/* Floating toggle button on mobile */}
        {width < 768 && (
          <button
            className="fixed bottom-4 left-4 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
            onClick={() => setShowSidebar(prev => !prev)}
          >
          {showSidebar ?  <X size={24}/> :   <Menu size={24} />}
          </button>
        )}
      </div>
    </>
  );
};

export default App;
