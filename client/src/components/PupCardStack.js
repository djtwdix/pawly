import React, { useState, useEffect } from "react";
import usePupData from "../hooks/usePupData";
import PupCard from "./PupCard";
import SwipeButtons from "./SwipeButtons";

export default function PupCardStack({ user }) {
  const { getAllPups, pups } = usePupData()
  
  useEffect(() => {
    if (user) {
      getAllPups(user.uid);
    }
  }, [user]);

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
