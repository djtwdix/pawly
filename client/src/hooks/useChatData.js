import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

export default function useChatData() {
  const user = auth.currentUser;
  const [chats, setChats] = useState([]);

  //fetches chats based on passed user id
  useEffect(() => {
    let mounted = true;
    const getChatsByUserID = async () => {
      const result = await axios.get("/chats/all");
      if (mounted) {
        setChats(result.data);
      }
    };

    if (user) {
      getChatsByUserID(user.uid);
    }
    return () => {
      mounted = false;
    };
  }, [user]);
  return { chats };
}
