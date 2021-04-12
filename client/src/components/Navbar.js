import React from "react";
import "../stylesheets/Navbar.scss";
import logo from "../assets/images/pawlylogo.png";

//Icons
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Avatar, IconButton } from "@material-ui/core";

export default function Navbar() {
  const backButton = true;
  const user = true;
  return (
    <nav className="navbar">
      {backButton ? (
        <IconButton>
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
      ) : user ? (
        <IconButton>
          <Avatar
            style={{
              padding: "10px",
              margin: "0",
              height: "29px",
              width: "29px",
            }}
          >
            DT
          </Avatar>
        </IconButton>
      ) : (
        <IconButton>
          <PersonIcon fontSize="large" />
        </IconButton>
      )}
      <img src={logo} alt="pawly-logo"></img>
      <IconButton>
        <ForumIcon fontSize="large" />
      </IconButton>
    </nav>
  );
}
