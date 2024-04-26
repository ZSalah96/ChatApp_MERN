import { useEffect } from "react";

import { useSocketContext } from "./context/SocketContext";
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../store/conversationSlice'; // Import setMessages action creator

const useListenMessages = () => {
	const { socket } = useSocketContext();
    const messages = useSelector(state => state.conversation.messages); // Retrieve messages from Redux store
    const dispatch = useDispatch(); // Add useDispatch to dispatch actions

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			dispatch(setMessages([...messages, newMessage]));
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
