import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "../css/Chat.css";
import ListItemContainer from "./ListItemContainer";

export default function Chat ({ id, name, message, photoURL, timestamp }) {
  return (
    <Link to={`/chats/1`}>
      <ListItemContainer>
        <section className="chat">
          <Avatar 
          className="chat__image"
          alt={name}
          src={photoURL}
          >
          </Avatar>
          <div className="chat__details">
            <h1>{name}</h1>
            <p>{message}</p>
          </div>
          <p className="chat__timestamp">{timestamp}</p>
        </section>
      </ListItemContainer>
    </Link>
  );
}