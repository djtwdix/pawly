import React, { useEffect, useState } from "react";
import Chat from "./Chat";

export default function Chats({ user }) { 
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if(user) {
     
      const unsubscribe = setChats(chatsRef(user.id));
      return unsubscribe;
    }
  }, [user]);

  const parsedChats = chats.map((chat) => {
    console.log(user.uid);
    const otherUser = chat.participants.filter(
      (participant) => participant.id !== user.uid
    )[0];
    console.log("otherUser ", chat);
    return (
      <Chat
        key={chat.id}
        id={chat.id}
        name={otherUser.name.split(" ")[0]}
        message={chat.initialMessage}
        timestamp="30 seconds ago"
        photoURL={otherUser.photoURL}
      />
    );
  });

  return (
    <section>
      {parsedChats}

      <Chat
        name="Jesse"
        message="Yooooo!"
        timestamp="30 seconds ago"
        profile_pix="url..."
      />
    </section>
  );
}