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
  const { chatID } = useParams;
  const { getUserInfo } = useUserData();
  const { fetchChatData, fetchMessageData } = useChatData();

  useEffect(() => {
    const socket = io();
    setConnection(socket);
    socket.on("messages", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    fetchChatData(user.uid).then((res) => {
      const chat = res.data;
      fetchMessageData(chat.id).then((res) => {
        setMessages(res.data);
      });
    });

    //setOtherUser(chat.participants.filter((participant) => participant.id !== user.uid));
  }, [chatID, user]);

  const parntnerInfo = getUserInfo(otherUser);
  /*
  const parsedMessages = messages.map((message) => {
    return message.user_id !== user.uid ? (
      <Container>
        <div class="chatWindow__message">
          <Avatar
            className="chatWindow__image"
            src={parntnerInfo.photoURL}
          ></Avatar>
          <p class="chatWindow__text">{message.message}</p>
        </div>
      </Container>
    ) : (
      <div class="chatWindow__message">
        <p class="chatWindow__text__user">{message.message}</p>
        <Avatar
          className="chatWindow__image"
          src={user.photoURL}
        ></Avatar>
      </div>
    );
  }); */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setMessages([...messages, { id: user.uid, text: input }]);
    }
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    connection.emit("messages", {
      name: user.displayName,
      message: input,
      user_id: user.uid,
    });
    console.log("clicked");
    if (input) {
      axios
        .post("/messages", {
          name: user.displayName,
          message: input,
          received: "false",
        })
        .then((res) => {})
        .catch((err) => console.log(err.message));
    }
  };

  const message = {
    sender_id: user.uid,
    text: "Hello",
  };

  const message2 = {
    sender_id: "alskfhalskdjhfua",
    text: "Hello There!",
  };

  return (
    <section className="chatWindow">
      <p class="chatWindow__match"></p>
      <ChatMessage user={user} message={message} />
      <ChatMessage user={user} message={message2} />
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
        <mui.Button type="submit" onClick={handleSubmitNew}>
          <p className="chatWindow__inputButton">SEND</p>
        </mui.Button>
      </form>
    </section>
  );
}
