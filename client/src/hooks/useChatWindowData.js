import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { auth } from "../firebase/config";
import { useLocation } from "react-router-dom";
import getUserById from "../helpers/getUserById";

export default function useChatWindowData() {
  const user = auth.currentUser;
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState({});
  const [connection, setConnection] = useState({});
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [otherUser, setOtherUser] = useState({});
  const messageInputRef = useRef(null);

  //pulls chat data information passed as state prop via useLocation()
  const chatData = useLocation();

  //defaults chatID to null unless chataData.state exists, extracts chatID to be used in below functions
  let chatID = null;
  if (chatData.state) {
    chatID = chatData.state._id;
  }

  //if chatID is present, gets messages for current chat window based on ID
  useEffect(() => {
    let mounted = true;
    if (chatID) {
      const getMessagesByChatId = (chatId) => {
        return axios.get(`/chats/${chatId}/messages`);
      };
      getMessagesByChatId(chatID).then((res) => {
        if (mounted) {
          setMessages(res.data);
        }
      });
      axios.get(`/chats/${chatID}`).then((res) => {
        if (mounted) {
          setChatInfo(res.data);
        }
        const participant = res.data.participants.filter(
          (id) => id !== user.uid
        );
        getUserById(participant).then((res) => {
          if (mounted) {
            setOtherUser(res.data);
          }
        });
      });
    }
    return () => {
      mounted = false;
    };
  }, [chatID, user]);

  //websocket connections
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

  //handles submission of new messages to chat window/database for that chat
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

  //handles clicking of emojis from emoji window in chat window
  const onEmojiClick = (event, emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    messageInputRef.current.focus();
    setShowEmojis(false);
  };

  //sets whether emoji window is displayed by toggling state upon click of emoji button
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
    messageInputRef,
    otherUser,
  };
}
