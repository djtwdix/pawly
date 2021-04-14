import React from "react";
import ChatListItem from "./ChatListItem";
import useChatData from "../hooks/useChatData";

export default function ChatList({ user }) {
  const { chats } = useChatData();

  const parsedChats = chats.map((chat) => {
    return <ChatListItem key={chat._id} chat={chat} user={user} />;
  });

  return <section>{parsedChats}</section>;
}
