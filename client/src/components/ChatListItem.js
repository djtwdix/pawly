import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import ListItemContainer from "./ListItemContainer";
import getUserById from "../helpers/getUserById";
import moment from "moment";

export default function ChatListItem({ chat, user }) {
  const [otherUser, setOtherUser] = useState({});
  const last_message = chat.last_message;

  useEffect(() => {
    let mounted = true;
    if (chat && user) {
      const otherUserID = chat.participants.filter((participant) => {
        return participant !== user.uid;
      });
      getUserById(otherUserID[0]).then((res) => {
        if (mounted) {
          setOtherUser(res.data);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [chat, user]);

  return (
    <Link to={{ pathname: `/chats/messages`, state: chat }}>
      <ListItemContainer>
        <section className="chat">
          <Avatar
            className="chat__image"
            alt={otherUser.name}
            src={otherUser.photoURL}
          ></Avatar>
          <div className="chat__details">
            <h1>{otherUser.name}</h1>
            <p>
              {last_message.text.substring(0, 30)}
              {last_message.text.length > 30 && "..."}
            </p>
          </div>
          <p className="chat__timestamp">
            {moment(last_message.created_at).fromNow()}
          </p>
        </section>
      </ListItemContainer>
    </Link>
  );
}
