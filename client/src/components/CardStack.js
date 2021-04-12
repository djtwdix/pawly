import React, { useState, useEffect } from "react";
import PupCard from "./PupCard";

export default function CardStack({ user }) {
  const [pups, setPups] = useState([]);

  useEffect(async () => {
    if (user) {
      const unsubscribe = setPups(await axios.get('/pups', { user_id: user.uid }));
      return unsubscribe;
    }
  }, [user]);

  const parsedPups = pups.map((pup) => {
    return <PupCard
      key={pup._id}
      pup={pup}
      user={user}
      owner={pup.owner_id}
    />
  });

  return (
    <section>
      <div className="card__container">{parsedPups}</div>
    </section>
  );
}