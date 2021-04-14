import React from "react";
import usePupData from "../hooks/usePupData";
import PupCard from "./PupCard";
import PupCardInfo from "./PupCardInfo";
import SwipeButtons from "./SwipeButtons";
import useCardActions from "../hooks/useCardActions";

export default function PupCardStack({ user }) {
  const { pups } = usePupData();
  const { showPhoto, photoController } = useCardActions();
  
  const parsedPups = pups.map((pup) => {
    return <PupCard key={pup._id} pup={pup} user={user} owner={pup.owner_id} photoController={photoController} />;
  });

  const parsedPupsInfo = pups.map((pup) => {
    return <PupCardInfo key={pup._id} pup={pup} user={user} owner={pup.owner_id} photoController={photoController} />;
  });

  return (
    <section>
      <div className="card__container">{ showPhoto ? parsedPups : parsedPupsInfo }</div>
      <SwipeButtons />
    </section>
  );
}
