import React from "react";
import usePupData from "../hooks/usePupData";
import PupCard from "./PupCard";
import PupCardInfo from "./PupCardInfo";
import SwipeButtons from "./SwipeButtons";
import useCardActions from "../hooks/useCardActions";
import getDistanceByCoords from "../helpers/getDistanceByCoords";
import useLocationData from "../hooks/useLocationData";

export default function PupCardStack({ user }) {
  const { pups, setPups } = usePupData();
  const { showPhoto, photoController } = useCardActions();
  const { location } = useLocationData();

  //const nearPups = pups.filter( pup => getDistanceByCoords(pup.location.coordinates,location.coordinates) < 50 )
  

  const removePup = () => {
    setPups((prev) => [...prev.slice(0, prev.length - 1)]);
  };

  console.log(pups);

  const parsedPups = pups.map((pup) => {
    return (
      <PupCard
        removePup={removePup}
        key={pup._id}
        pup={pup}
        user={user}
        owner={pup.owner_id}
        photoController={photoController}
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
      />
    );
  });

  return (
    <section>
      <div className="pupCard__container">
        {showPhoto ? parsedPups : parsedPupsInfo}
      </div>
      
    </section>
  );
}
