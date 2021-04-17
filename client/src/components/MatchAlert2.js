import React from "react";
import { Link } from "react-router-dom";
import matchAlert from "../assets/images/it's a.png";
import dogBark from "../assets/audio/dog bark.wav";

export default function MatchAlert2({}) {
  return (
    <div className="matchAlert2__container">
      <div className="matchAlert2">
        <Link to="/chats">
          <img src={matchAlert} alt="match"></img>
          {/* <h1>It's a match!</h1>
          <Button>click to chat</Button> */}
        </Link>
        <audio autoplay>
          <source src={dogBark} type="audio/mpeg" />
        </audio>
        <iframe
          title="dogbark"
          src={dogBark}
          allow="autoplay"
          style={{ display: "none" }}
          id="iframeAudio"
        ></iframe>
      </div>
    </div>
  );
}
