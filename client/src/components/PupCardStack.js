import React, { useEffect } from "react";
import usePupData from "../hooks/usePupData";
import PupCard from "./PupCard";
import SwipeButtons from "./SwipeButtons";

export default function PupCardStack({ user }) {
  const { getAllPups, pups } = usePupData()
  
  useEffect(() => {
    
    if (user) {
    const unsubscribe = getAllPups(user.uid);
    return unsubscribe
    }
  });

  const parsedPups = pups.map((pup) => {
    return <PupCard key={pup._id} pup={pup} user={user} owner={pup.owner_id} />;
  });

  return (
    <section>
      <div className="card__container">{parsedPups}</div>
      <SwipeButtons />
    </section>
  );
}
