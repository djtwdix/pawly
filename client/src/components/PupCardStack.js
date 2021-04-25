import React, { useState } from "react";
import usePupData from "../hooks/usePupData";
import PupCard from "./PupCard";
import PupCardInfo from "./PupCardInfo";
import loadingGif from "../assets/images/giphy.gif";
import allDone from "../assets/images/alldone.png";
import useCardActions from "../hooks/useCardActions";
import MatchAlert2 from "./MatchAlert2";

export default function PupCardStack({ user, soundOff }) {
  const { pups, setPups } = usePupData();
  const { showPhoto, photoController } = useCardActions();
  const [showMatchAlert, setShowMatchAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState(null)

  const setMatchAlertFalse = () => {
    if (showMatchAlert) {
      setShowMatchAlert(false);
    }
  };

  const removePup = () => {
    setPups((prev) => [...prev.slice(0, prev.length - 1)]);
    parsedPups.slice(0, parsedPups.length - 1);
    parsedPupsInfo.slice(0, parsedPups.length - 1);
    setLoading(false);
  };

  const parsedPups = pups.map((pup, index) => {
    return (
      <PupCard
        index={index}
        removePup={removePup}
        key={pup._id}
        pup={pup}
        user={user}
        owner={pup.owner_id}
        photoController={photoController}
        setShowMatchAlert={setShowMatchAlert}
        setChat={setChat}
        pups={pups}
      />
    );
  });

  const parsedPupsInfo = pups.map((pup, index) => {
    return (
      <PupCardInfo
        index={index}
        removePup={removePup}
        key={pup._id}
        pup={pup}
        user={user}
        owner={pup.owner_id}
        photoController={photoController}
        setShowMatchAlert={setShowMatchAlert}
        setChat={setChat}
        pups={pups}
      />
    );
  });

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
