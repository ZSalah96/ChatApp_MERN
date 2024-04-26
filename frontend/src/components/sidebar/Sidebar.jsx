import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import { useAuthContext } from '../../hooks/context/AuthContext';

export default function Sidebar() {
  const { authUser } = useAuthContext();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const isMobileScreen = () => window.innerWidth <= 767;
    setIsMobile(isMobileScreen());

    const handleResize = () => setIsMobile(isMobileScreen());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-${isMobile ? (isOpen ? 'auto' : '0') : '1/4'} border-r border-slate-500 px-4 pl-2 py-2 flex flex-col justify-between transition-all duration-300 ease-in-out mobile:z-10 mobile:absolute mobile:bg-[#97DECE] mobile:h-auto mobile:border-b`}>
      {isMobile && (
        <>
          <div className="flex items-center">
            <button onClick={toggleSidebar} className=' text-black text-xl py-4'>
              {isOpen ? 'X' : '☰'}
            </button>
            {isOpen && <SearchInput />}
          </div>
          {isOpen && (
            <>
              <div className='divider px-3'></div>
                <Conversations />
              <div className='divider px-3'></div>
              <div className='flex items-end'>
                  <LogoutButton /> 
                  <div className='ml-4 text-black'><span className='font-bold'>{authUser.fullName}</span></div>
              </div>
            </>
          )}
        </>
      )}
      {!isMobile && (
        <>
          <SearchInput />
          <div className='divider px-3'></div>
          <Conversations />
          <div className='divider px-3'></div>
          <div className='flex items-end mobile:size-1'>
            <LogoutButton /> 
            <div className='ml-4 text-black'>Connected as <span className='font-bold'>{authUser.fullName}</span></div>
          </div>
        </>
      )}
    </div>
  );
}
  