import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedConversation } from '../../store/conversationSlice';
import { useSocketContext } from '../../hooks/context/SocketContext';
import useGetConversations from '../../hooks/useGetConversations';

const Conversation = ({ conversation, lastIdx }) => {
  const selectedConversation = useSelector(state => state.conversation.selectedConversation);
  const isSelected = selectedConversation?._id === conversation._id;
  const dispatch = useDispatch();

  
  const handleSelectConversation = () => {
    dispatch(setSelectedConversation(conversation));
  };

  const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);


  return (
    <>      
      <div 
        className={`flex gap-2 items-center hover:bg-[#439A97] rounded p-2 py-1 cursor-pointer 
        ${isSelected ? "bg-[#439A97]" : ""} 
        `}
        onClick={handleSelectConversation}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className='w-12 rounded-full mobile:w-4 '>
            <img src={conversation.profilePic} alt='user avatar' />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-black laptop:text-xl mobile:text-sm '>{conversation.fullName}</p>
          </div>
        </div>
      </div>
      
      {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>  
  );
}

export default Conversation;
