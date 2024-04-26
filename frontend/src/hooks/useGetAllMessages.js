import { useState, useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";
import { useSelector, useDispatch } from 'react-redux';

const useGetAllMessages = () => {
  const selectedConversation = useSelector(state => state.conversation.selectedConversation); 
 
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchMsgs = async () => {
      try {
        if (!authUser) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const userId = authUser?._id;
        if (!userId) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("chat-user")?.token;
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        const requestOptions = { method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      
      const response = await fetch(`http://localhost:5000/api/messages/all/${userId}`, requestOptions);
      if (!response.ok) {
        throw new Error("Failed to fetch msgs");
        
      }

      const msgsData = await response.json();
      setMsgs(msgsData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  fetchMsgs();
}, [selectedConversation, authUser]);

return { msgs, loading, error };
};

export default useGetAllMessages;
