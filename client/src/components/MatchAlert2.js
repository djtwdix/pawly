import React from "react";
import { Link } from "react-router-dom";
import matchAlert from "../assets/images/it's a.png";
import goChat from "../assets/images/2.png";
import keepFetching from "../assets/images/3.png";
import dogBark from "../assets/audio/dog bark.wav";

export default function MatchAlert2({ setMatchAlertFalse }) {
  return (
    <div className="matchAlert2__container" style={{ marginTop: "20px" }}>
      <div className="matchAlert2">
        <img src={matchAlert} alt="match"></img>
        <Link to="/chats">
          <img
            src={goChat}
            alt="chat"
            style={{ height: "100px", width: "100px" }}
          ></img>
        </Link>
        <img
          src={keepFetching}
          alt="fetch"
          style={{ height: "100px", width: "100px", cursor: "pointer" }}
          onClick={() => setMatchAlertFalse()}
        ></img>
        <audio autoPlay>
          <source src={dogBark} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}
