import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { io } from "socket.io-client";
import * as mui from "@material-ui/core";
import useUserData from "../hooks/useUserData";
import useChatData from "../hooks/useChatData";
import ChatMessage from "./ChatMessage";


export default function ChatWindow({ user }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [connection, setConnection] = useState({});
  const { chatID } = useParams();
  const { getUserInfo } = useUserData();
  const { getMessagesByChatId } = useChatData();

  useEffect(() => {
    getMessagesByChatId(chatID)
      .then(res => {
        setMessages(res.data)
      });
    const socket = io();
    setConnection(socket);
    socket.on("messages", (data) => {
      setMessages((prev) => [...prev, data]);
    })
  }, []);

const handleSubmit = (e) => {
  e.preventDefault();
  connection.emit("messages", {
    name: user.displayName,
    message: input,
    user_id: user.uid,
  });

  if (input) {
    axios
      .post("/messages", {
        name: user.displayName,
        text: input,
        sender_id: user.uid,
        chat_id: chatID
      })
      .then((res) => { })
      .catch((err) => console.log(err.message));
  }
};

const parsedMessages = messages.map(message => {
  return <ChatMessage key={message._id} user={user} message={message} />
})

return (
  <section className="chatWindow">
    <p className="chatWindow__match">you matched with someone</p>
   {parsedMessages}
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
      <mui.Button
        style={{ backgroundColor: "transparent" }}
        type="submit"
      >
        <p className="chatWindow__inputButton">SEND</p>
      </mui.Button>
    </form>
  </section>
);
}
