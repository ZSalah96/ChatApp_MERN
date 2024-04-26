import { useState, useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";

const useGetChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchChats = async () => {
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

      const response = await fetch(`http://localhost:5000/api/chat/${userId}`, requestOptions);
      if (!response.ok) {
        throw new Error("Failed to fetch chats");
        
      }

      const chatsData = await response.json();
      setChats(chatsData.conversations);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  fetchChats();
}, [authUser]);

return { chats, loading, error };
};

export default useGetChats;


