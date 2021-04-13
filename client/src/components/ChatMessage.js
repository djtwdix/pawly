import React from "react";
import { Avatar } from "@material-ui/core";

export default function ChatMessage({ user, message, otherUser }) {
  return (
    <section>
      {user.uid !== message.sender_id ? (
        <div className="chatWindow__message">
          <Avatar className="chatWindow__image" src={""}></Avatar>
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
