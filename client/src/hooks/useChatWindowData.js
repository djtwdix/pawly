import axios from "axios";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { auth } from "../firebase/config";
import { useLocation} from "react-router-dom";

export default function useChatWindowData() {
  const user = auth.currentUser;
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState({});
  const [connection, setConnection] = useState({});
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const chatData = useLocation();
  let chatID = null;
  if (chatData.state) {
    chatID = chatData.state._id
  }

  useEffect(() => {
    const getMessagesByChatId = (chatId) => {
      return axios.get(`/chats/${chatId}/messages`);
    };
    getMessagesByChatId(chatID).then((res) => {
      setMessages(res.data);
    });
    axios.get(`/chats/${chatID}`).then((res) => {
      setChatInfo(res.data);
    });
  }, [chatID]);

  useEffect(() => {
    const socket = io();
    setConnection(socket);
    socket.on("messages", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    let id = Math.random().toString(36).substring(7);
    e.preventDefault();
    if (input) {
      connection.emit("messages", {
        name: user.displayName,
        text: input,
        sender_id: user.uid,
        chat_id: chatID,
        _id: id,
      });
      axios
        .post("/messages", {
          name: user.displayName,
          text: input,
          sender_id: user.uid,
          chat_id: chatID,
        })
        .then((res) => {
          setInput("");
          const lastMessage = res.data;
          axios.put("/chats", { lastMessage });
        })
        .catch((err) => console.log(err.message));
    }
  };

  const onEmojiClick = (event, emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    setShowEmojis(false);
  };

  const showEmojiKeyboard = (e) => {
    if (showEmojis) {
      setShowEmojis(false);
    } else {
      setShowEmojis(true);
    }
  };

  return {
    messages,
    chatInfo,
    handleSubmit,
    showEmojis,
    showEmojiKeyboard,
    onEmojiClick,
    input,
    setInput,
  };
}
