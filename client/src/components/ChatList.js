import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import useChatData from "../hooks/useChatData";
import { Link } from "react-router-dom";

export default function ChatList({ user }) {
  const { chatsRef } = useChatData();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (user) {
      chatsRef(user.id).then((res) => setChats(res.data));
    }
  }, [user, chatsRef]);

  const parsedChats = chats.map((chat) => {
    console.log(user.uid);
    const otherUser = chat.participants.filter(
      (participant) => participant.id !== user.uid
    )[0];
    console.log("otherUser ", chat);
    return <ChatListItem chat={chat} />;
  });

  return (
    <section>
      {parsedChats}
      <ChatListItem
        name="Jesse"
        message="Yooooo!"
        timestamp="30 seconds ago"
        profile_pix="url..."
      />
    </section>
  );
}
