import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import ListItemContainer from "./ListItemContainer";
import useUserData from "../hooks/useUserData"

export default function Chat({ chat, user }) {
  const [otherUser, setOtherUser] = useState({})
  const { getUserById } = useUserData()
   
 useEffect(() => {
     if (chat && user) {
       const otherUserID = chat.participants.filter((participant) => {
         return participant !== user.uid
        })
       getUserById(otherUserID[0]).then(res => {
          setOtherUser(res.data)
        })
     }
 }, [chat, user])
  
  return (
    <Link to={`/chats/${chat._id}`}>
        <ListItemContainer>
          <section className="chat">
            <Avatar className="chat__image" alt={otherUser.name} src={otherUser.photoURL}></Avatar>
            <div className="chat__details">
              <h1>{otherUser.name}</h1>
              <p>Hello!</p>
            </div>
            <p className="chat__timestamp">{chat.created_at}</p>
          </section>
        </ListItemContainer>
    </Link>
  );
}
