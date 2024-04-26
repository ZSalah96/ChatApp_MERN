import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'



export default function Home() {
  return (
    <div className="bg-[#CBEDD5] w-full h-full flex">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}