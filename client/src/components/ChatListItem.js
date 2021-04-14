import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import ListItemContainer from "./ListItemContainer";
import useUserData from "../hooks/useUserData";
import moment from "moment";

export default function Chat({ chat, user }) {
  const [otherUser, setOtherUser] = useState({});
  const { getUserById } = useUserData();

  const last_message = chat.last_message[0];

  useEffect(() => {
    if (chat && user) {
      const otherUserID = chat.participants.filter((participant) => {
        return participant !== user.uid;
      });
      getUserById(otherUserID[0]).then((res) => {
        setOtherUser(res.data);
      });
    }
  });

  return (
    <Link to={`/chats/${chat._id}`}>
      <ListItemContainer>
        <section className="chat">
          <Avatar
            className="chat__image"
            alt={otherUser.name}
            src={otherUser.photoURL}
          ></Avatar>
          <div className="chat__details">
            <h1>{otherUser.name}</h1>
            <p>{last_message.text}</p>
          </div>
          <p className="chat__timestamp">
            {moment(last_message.created_at).fromNow()}
          </p>
        </section>
      </ListItemContainer>
    </Link>
  );
}
