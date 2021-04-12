import React, { useState, useEffect } from "react";
import PupCard from "./PupCard";
import axios from "axios";

export default function CardStack({ user }) {
  const [pups, setPups] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setPups(await axios.get("/pups", { user_id: user.uid }));
      };
      const unsubscribe = fetchData();
      return unsubscribe;
    }
  }, [user]);

  const parsedPups = pups.map((pup) => {
    return <PupCard key={pup._id} pup={pup} user={user} owner={pup.owner_id} />;
  });

  return (
    <section>
      <div className="card__container">{parsedPups}</div>
    </section>
  );
}
