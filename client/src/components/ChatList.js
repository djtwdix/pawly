import React, { useEffect } from "react";
import ChatListItem from "./ChatListItem";
import useChatData from "../hooks/useChatData";

export default function ChatList({ user }) {
  const { getChatsByUserID, chats } = useChatData();

  useEffect(() => {
    if (user) {
     const unsubscribe = getChatsByUserID(user.uid)
     return unsubscribe
    }
  });
  
    const parsedChats = chats.map(chat => {
      return <ChatListItem key={chat._id} chat={chat} user={user}/>;
    });

  return (
    <section>
      {parsedChats}
    </section>
  );
}
