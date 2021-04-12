import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import "../css/Chat.css";
import { Button } from "@material-ui/core";

export default function Chat ({ id, name, message, photoURL, timestamp }) {
  return (
    <Link to={`/chat/${id}`}>
      <Button style={{ width: "100%" }}>
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
      </Button>
    </Link>
  );
}