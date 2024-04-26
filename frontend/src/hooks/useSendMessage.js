import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedConversation, setMessages } from '../store/conversationSlice'; 
import useGetAllMessages from "./useGetAllMessages";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const selectedConversation = useSelector(state => state.conversation.selectedConversation); // Retrieve selectedConversation from Redux store
  const messages = useSelector(state => state.conversation.messages); // Retrieve messages from Redux store
  const dispatch = useDispatch(); // Add useDispatch to dispatch actions

  const sendMessage = async (message) => {
    setLoading(true);
    
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Dispatch setMessages action to update messages state
      dispatch(setMessages([...messages, data]));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
