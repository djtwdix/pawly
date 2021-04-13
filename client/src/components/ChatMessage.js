import React from "react";
import { Avatar } from "@material-ui/core";

export default function ChatMessage({ user, message, otherUser }) {
  return (
    <section>
      {user.uid !== message.sender_id ? (
        <div class="chatWindow__message">
          <Avatar className="chatWindow__image" src={""}></Avatar>
          <p class="chatWindow__text">{message.text}</p>
        </div>
      ) : (
        <div class="chatWindow__message">
          <p class="chatWindow__textUser">{message.text}</p>
          <Avatar className="chatWindow__image" src={user.photoURL}></Avatar>
        </div>
      )}
    </section>
  );
}
