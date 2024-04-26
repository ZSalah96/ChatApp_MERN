import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../store/conversationSlice'; // Import setMessages action creator

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const selectedConversation = useSelector(state => state.conversation.selectedConversation); // Retrieve selectedConversation from Redux store
    const messages = useSelector(state => state.conversation.messages); // Retrieve messages from Redux store
    const dispatch = useDispatch(); // Add useDispatch to dispatch actions

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                
                dispatch(setMessages(data));// Dispatch setMessages action to update messages state
                
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, dispatch]); // Include dispatch in the dependency array

    return { messages, loading };
};
export default useGetMessages;
