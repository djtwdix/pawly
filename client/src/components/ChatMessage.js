import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import getUserById from "../helpers/getUserById";

export default function ChatMessage({ user, message }) {
  const [otherUser, setOtherUser] = useState({});

  useEffect(() => {
    let mounted = true;
    if (message && user) {
      if (message.sender_id !== user.uid) {
        getUserById(message.sender_id).then((res) => {
          if (mounted) {
            setOtherUser(res.data);
          }
        });
      }
    }
    return () => {
      mounted = false;
    };
  }, [message, user]);

  return (
    <section>
      {user.uid !== message.sender_id ? (
        <div className="chatWindow__message">
          <Avatar
            className="chatWindow__image"
            src={otherUser.photoURL}
          ></Avatar>
          <p className="chatWindow__text">{message.text}</p>
        </div>
      ) : (
        <div className="chatWindow__message">
          <p className="chatWindow__textUser">{message.text}</p>
          <Avatar className="chatWindow__image" src={user.photoURL}></Avatar>
        </div>
      )}
    </section>
  );
}
