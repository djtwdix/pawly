import axios from "axios";

export default function useChatData() {
  const fetchChatData = async (userId) => {
    try {
      const chat = await axios.get(`/chats`, { user_id: { userId } });
      return chat;
    } catch (error) {
      return error;
    }
  }

  const fetchMessageData = async (chatId) => {
    try {
      const messages = await axios.get(`/chats/${chatId}/messages`);
      if (messages) {
        return messages;
      }
    } catch (error) {
      return error;
    }
  }

  const chatsRef = async (userId) => {
    const chats = await axios.get(`chats`, { userID: userId });
    return chats;
  }


  return { fetchChatData, fetchMessageData, chatsRef };
}