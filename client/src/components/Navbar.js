import React from "react";

import logo from "../assets/images/pawlylogo.png";
import { Link, useHistory } from "react-router-dom";

import { Avatar, IconButton } from "@material-ui/core";

//Icons
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import getInitials from "../helpers/getInitials";

export default function Navbar({ user, backButton, hideChatButton }) {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <nav className="navbar">
      {backButton ? (
        <IconButton onClick={(e) => history.push(backButton)}>
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
      ) : user ? (
        <Link
          to={"/profile"}
        >
          <IconButton>
            <Avatar
              className="navbar__avatar"
              src={user.photoURL}
              style={{
                margin: "0",
                height: "49px",
                width: "49px",
              }}
            >
              {getInitials(user.displayName)}
            </Avatar>
          </IconButton>
        </Link>
      ) : (
        <IconButton>
          <PersonIcon fontSize="large" />
        </IconButton>
      )}
      <Link to="/">
        <img className="navbar__logo" src={logo} alt="pawly-logo"></img>
      </Link>
      {hideChatButton ? (
        <IconButton>
          <ForumIcon fontSize="large" />
        </IconButton>
      ) : (
        <Link to={hideChatButton ? path : "/chats"}>
          <IconButton>
            <ForumIcon fontSize="large" />
          </IconButton>
        </Link>
      )}
    </nav>
  );
}
