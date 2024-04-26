import React from 'react';
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import useGetAllMessages from '../../hooks/useGetAllMessages';
import { useSelector } from 'react-redux';

export default function Conversations() {
  const { conversations, conversationsLoading } = useGetConversations();
  const selectedConversation = useSelector(state => state.conversation.selectedConversation); // Retrieve selectedConversation from Redux store
  const { msgs, messagesLoading } = useGetAllMessages();

  if (conversationsLoading || messagesLoading) {
    return <span className='loading loading-spinner mx-auto'></span>;
  }

  const hasMessages = conversations.some(conversation => {
    const conversationMessages = msgs.filter(
      message => message.senderId === conversation._id || message.receiverId === conversation._id
    );
    return conversationMessages.length > 0;
  });

  // Filter out selected conversation if it already exists in conversations with messages
  const filteredConversations = hasMessages && selectedConversation ?
    conversations.filter(conversation => conversation._id !== selectedConversation._id) :
    conversations;

  return (
    <div className='flex flex-col overflow-auto'>
      {/* Render selected conversation if it exists */}
      {selectedConversation && (
        <Conversation
          key={selectedConversation._id}
          conversation={selectedConversation}
          messages={selectedConversation.messages}
          lastIdx={true}
        />
      )}
      {/* Render filtered conversations */}
      {filteredConversations.length > 0 ? (
        filteredConversations.map((conversation, idx) => {
          // Filter messages based on conversation._id
          const conversationMessages = msgs.filter(
            message =>
              message.senderId === conversation._id || message.receiverId === conversation._id
          );
          // Check if there are messages for this conversation
          if (conversationMessages.length > 0) {
            return (
              <Conversation
                key={conversation._id}
                conversation={conversation}
                messages={conversationMessages}
                lastIdx={idx === filteredConversations.length - 1}
              />
            );
          } else {
            return null; // If no messages, don't render the conversation
          }
        })
      ) : (
        <p></p>
      )}
    </div>
  );
}
