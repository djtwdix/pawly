import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { io } from "socket.io-client";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { Container } from "@material-ui/core";
import "./ChatWindow.css";
import useUserData from "../hooks/useUserData";

export default function ChatWindow({ user }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [mongoMessages, setMongoMessages] = useState([]);
  const [otherUser, setOtherUser] = useState({});
  const [connection, setConnection] = useState({});
  const { chatID } = useParams;
  const { getUserInfo } = useUserData();

  useEffect(() => {
    const socket = io();
    setConnection(socket);
    socket.on("messages", (data) => {
      setMongoMessages((prev) => [...prev, data]);
    });
  }, []);

  useEffect(async () => {
    try {
      const chat = await axios.get(`/chats`, { user_id: user.uid });
    } catch (error) {
      return error;
    }
    setOtherUser(chat.participants.filter((participant) => participant.id !== user.uid));
    try {
      const messages = await axios.get(`/chats/${chatID}/messages`);
    } catch (error) {
      return error;
    }
    if (messages) {
      setMessages(messages)
    }
    await axios.get("messages/sync").then((res) => {
      setMongoMessages(res.data);
    });
  }, [chatID, user]);

  const parntnerInfo = getUserInfo(otherUser);

  const parsedMessages = mongoMessages.map((message) => {
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
        <p class="chatWindow__textUser">{message.message}</p>
        <Avatar
          className="chatWindow__image"
          src={user.photoURL}
        ></Avatar>
      </div>
    );
  });

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

  return (
    <section className="chatWindow">
      <p class="chatWindow__match"></p>
      {parsedMessages}
      <form onSubmit={handleSubmit} className="chatWindow_messageInput">
        <div className="chatWindow__inputMessageText">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message here"
            disableUnderline={true}
            required={true}
            fullWidth={true}
            autoFocus={true}
          ></Input>
        </div>
        <Button type="submit" onClick={handleSubmitNew}>
          <p className="chatWindow__inputButton">SEND</p>
        </Button>
      </form>
    </section>
  );
};
