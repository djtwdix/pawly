import axios from "axios";
import { useState } from "react";

export default function useChatData() {
  const [chats, setChats] = useState([]);

  const getChatsByUserID= async (userId) => {
     const result = await axios.post(`/chats`, { user_id: userId });
     setChats(result.data);
  }

  const getMessagesByChatId = (chatId) => {
    return axios.get(`/chats/${chatId}/`);
  }


  return { getChatsByUserID, getMessagesByChatId, chats };
}