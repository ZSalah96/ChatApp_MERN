import React, { useEffect } from 'react';
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedConversation } from '../../store/conversationSlice';
import { useAuthContext } from '../../hooks/context/AuthContext';

export default function MessageContainer() {
  const selectedConversation = useSelector(state => state.conversation.selectedConversation);
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset selected conversation when unmounting
    return () => {
      dispatch(setSelectedConversation(null));
    };
  }, [dispatch]);

  return (
    <div className='w-4/5 flex flex-col mobile:w-screen mobile:pl-8'>
      {selectedConversation ? (
        <>
          <div className='bg-[#97DECE] px-4 py-2 mb-2 mobile:py-2'>
            <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  const handleSetSelectedConversation = () => {
   
  };

  return (
    <div className='flex items-center justify-center w-full h-full '>
      <div className='px-4 text-center text-black font-bold flex flex-col items-center gap-2 '>
        <p className='text-3xl mobile:text-sm'>Welcome 👋 {authUser.fullName} ❄</p>
        <p className='text-2xl mobile:text-sm'>Select a chat to start messaging</p>
        <TiMessages className='text-5xl text-center' onClick={handleSetSelectedConversation} />
      </div>
    </div>
  );
};
