import React from 'react';
import { useAuthContext } from "../../hooks/context/AuthContext.jsx";
import { useSelector } from 'react-redux';
import { extractTime } from '../../utils/extractTime.js';

export default function Message({ message }) {
    const { authUser } = useAuthContext();
    const selectedConversation = useSelector(state => state.conversation.selectedConversation);
    const fromMe = message.senderId === authUser?._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
	const formattedTime = extractTime(message.createdAt);
    


    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full mobile:w-6'>
                    <img alt='User avatar' src={profilePic}/>
                </div>
            </div>
            <div className={`chat-bubble text-white bg-[#439A97] mobile:text-lg mobile:h-10`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-black'>{formattedTime}</div>
        </div>
    );
}
