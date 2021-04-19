import React, { useState } from "react";
import usePupData from "../hooks/usePupData";
import PupCard from "./PupCard";
import PupCardInfo from "./PupCardInfo";
import loadingGif from "../assets/images/giphy.gif";
import useCardActions from "../hooks/useCardActions";
import MatchAlert2 from "./MatchAlert2";

export default function PupCardStack({ user, soundOff }) {
  const { pups, setPups, loading } = usePupData();
  const { showPhoto, photoController } = useCardActions();
  const [showMatchAlert, setShowMatchAlert] = useState(false);

  const setMatchAlertFalse = () => {
    if (showMatchAlert) {
      setShowMatchAlert(false);
    }
  };

  const removePup = () => {
    setPups((prev) => [...prev.slice(0, prev.length - 1)]);
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
      />
    );
  });

  return (
    <section>
      <div className="pupCard__container">
        {loading && !showMatchAlert && (
          <img
            src={loadingGif}
            alt="loading"
            style={{ width: "400px", height: "400px" }}
          />
        )}
        {showMatchAlert ? (
          <MatchAlert2
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
