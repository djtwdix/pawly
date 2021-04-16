import React, { useMemo, useState } from "react";
import usePupData from "../hooks/usePupData";
import PupCard from "./PupCard";
import PupCardInfo from "./PupCardInfo";
import SwipeButtons from "./SwipeButtons";
import useCardActions from "../hooks/useCardActions";
import getDistanceByCoords from "../helpers/getDistanceByCoords";
import useLocationData from "../hooks/useLocationData";
import MatchAlert from "./MatchAlert";

export default function PupCardStack({ user }) {
  const { pups, setPups } = usePupData();
  const { showPhoto, photoController } = useCardActions();
  const { location } = useLocationData();
  const [ showMatchAlert, setShowMatchAlert ] = useState(false);

  /* const nearPups = pups.filter(
    (pup) => console.log(pup) getDistanceByCoords(pup.location.coordinates, location.coordinates) < 50 
  ); */

  const matchAlert = () => {
    if (showMatchAlert) {
      setShowMatchAlert(false)
    } else {
      setShowMatchAlert(true);
    }
  }

  
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
        matchAlert={matchAlert}
      
      />
    );
  });

  const parsedPupsInfo = pups.map((pup) => {
    return (
      <PupCardInfo
        removePup={removePup}
        key={pup._id}
        pup={pup}
        user={user}
        owner={pup.owner_id}
        photoController={photoController}
        matchAlert={matchAlert}
      />
    );
  });

  return (
    <section>
      <div className="pupCard__container">
        {showPhoto ? parsedPups : parsedPupsInfo}
        { showMatchAlert && <MatchAlert matchAlert={matchAlert}/>}
      </div>
    </section>
  );
}
