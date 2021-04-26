import React from "react";
import usePupData from "../hooks/usePupData";
import loadingGif from "../assets/images/giphy.gif";
import allDone from "../assets/images/alldone.png";
import MatchAlert2 from "./MatchAlert2";

export default function PupCardStack({ soundOff }) {
  const {
    parsedPups,
    parsedPupsInfo,
    showMatchAlert,
    setMatchAlertFalse,
    showPhoto,
    chat,
    loading,
  } = usePupData();

  return (
    <section>
      <div className="pupCard__container">
        {!parsedPups.length && !showMatchAlert && loading ? (
          <img
            src={loadingGif}
            alt="loading"
            style={{ width: "300px", height: "300px" }}
          />
        ) : (
          !parsedPups.length &&
          !showMatchAlert && (
            <img
              className="pupCard__allDone"
              src={allDone}
              alt="loading"
              style={{ width: "350px", height: "350px" }}
              onClick={() => window.location.reload()}
            />
          )
        )}

        {showMatchAlert ? (
          <MatchAlert2
            chat={chat}
            setMatchAlertFalse={setMatchAlertFalse}
            soundOff={soundOff}
          />
        ) : showPhoto ? (
          parsedPups
        ) : (
          parsedPupsInfo
        )}
      </div>
    </section>
  );
}
