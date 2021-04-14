import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { io } from "socket.io-client";
import * as mui from "@material-ui/core";
import moment from "moment";
import useChatData from "../hooks/useChatData";
import ChatMessage from "./ChatMessage";
import SendIcon from "@material-ui/icons/Send";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import CloseIcon from "@material-ui/icons/Close";

export default function ChatWindow({ user }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState({});
  const [chatInfo, setChatInfo] = useState({});
  const { chatID } = useParams();
  const { getMessagesByChatId } = useChatData();
  const [showEmojis, setShowEmojis] = useState(false);
  const messagesEndRef = useRef(null);

  const onEmojiClick = (event, emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    setShowEmojis(false);
  };

  useEffect(() => {
    getMessagesByChatId(chatID).then((res) => {
      setMessages(res.data);
    });
    axios.get(`/chats/${chatID}`).then((res) => {
      setChatInfo(res.data);
    });
  });

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

  const showEmojiKeyboard = (e) => {
    if (showEmojis) {
      setShowEmojis(false);
    } else {
      setShowEmojis(true);
    }
  };

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

  const parsedMessages = messages.map((message) => {
    return <ChatMessage key={message._id} user={user} message={message} />;
  });

  return (
    <div>
      <p className="chatWindow__match">
        You matched {moment(chatInfo.created_at).fromNow()}
      </p>
      <section className="chatWindow">
        {parsedMessages}
        <div style={{ height: "63px" }} ref={messagesEndRef} />
        <form onSubmit={handleSubmit} className="chatWindow__messageInput">
          {showEmojis ? (
            <div>
              <mui.Button
                style={{
                  backgroundColor: "transparent",
                  position: "fixed",
                  bottom: "325px",
                }}
                onClick={showEmojiKeyboard}
              >
                <CloseIcon />
                close
              </mui.Button>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          ) : (
            <mui.Button
              style={{ backgroundColor: "transparent" }}
              onClick={showEmojiKeyboard}
            >
              <EmojiEmotionsIcon className="chatWindow__inputButton" />
            </mui.Button>
          )}
          <div className="chatWindow__messageInputText">
            <mui.Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message here"
              disableUnderline={true}
              required={true}
              fullWidth={true}
              autoFocus={true}
            ></mui.Input>
          </div>
          <mui.Button style={{ backgroundColor: "transparent" }} type="submit">
            <SendIcon className="chatWindow__inputButton" />
          </mui.Button>
        </form>
      </section>
    </div>
  );
}
