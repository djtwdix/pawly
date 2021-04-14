import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { io } from "socket.io-client";
import * as mui from "@material-ui/core";
import moment from "moment";
import useChatData from "../hooks/useChatData";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ user }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState({});
  const [chatInfo, setChatInfo] = useState({});
  const { chatID } = useParams();
  const { getMessagesByChatId } = useChatData();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessagesByChatId(chatID).then((res) => {
      setMessages(res.data);
    });
    axios.get(`/chats/${chatID}`).then((res) => {
      setChatInfo(res.data);
    });
  }, []);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          const lastMessage = res.data;
          console.log("lastMessage: ", lastMessage);
          axios.put("/chats", { lastMessage });
        })
        .catch((err) => console.log(err.message));
    }
  };

  const parsedMessages = messages.map((message) => {
    return <ChatMessage key={message._id} user={user} message={message} />;
  });

  return (
    <section className="chatWindow">
      <p className="chatWindow__match">
        You matched {moment(chatInfo.created_at).fromNow()}
      </p>
      {parsedMessages}
      <div style={{ height: "63px" }} ref={messagesEndRef} />
      <form onSubmit={handleSubmit} className="chatWindow__messageInput">
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
          <p className="chatWindow__inputButton">SEND</p>
        </mui.Button>
      </form>
    </section>
  );
}
