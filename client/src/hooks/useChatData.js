import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

export default function useChatData() {
  const user = auth.currentUser;
  
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChatsByUserID = async (userId) => {
      const result = await axios.post("/chats/all", { user_id: userId });
      setChats(result.data);
    };

    if (user) {
      getChatsByUserID(user.uid);
    }
  });
  return { chats };
}
