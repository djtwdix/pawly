import axios from "axios";

export default function useChatData() {
  const fetchChatData = (userId) => {
      return axios.get(`/chats`, { user_id: { userId } });
  }

  const fetchMessageData = (chatId) => {
    return axios.get(`/chats/${chatId}/messages`);
  }

  const chatsRef = (userId) => {
    return axios.get(`chats`, { userID: userId });
  }


  return { fetchChatData, fetchMessageData, chatsRef };
}