import { Button } from "@material-ui/core";
import TinderCard from "react-tinder-card";
import useCardActions from "../hooks/useCardActions";
import React from "react";
import axios from "axios";

export default function PupCard({ pup, user }) {
  const { view, showStats, checkMatch } = useCardActions();

  const onSwipe = async (direction) => {
    if (direction === "right") {
      axios.put(`/users/${user.uid}/likes`, {
        likeId: pup.owner_id,
      });
      console.log(pup.owner_id);
      const isMatch = await checkMatch(user.uid, pup.owner_id);
      if (isMatch) {
        const participants = [user.uid, pup.owner_id];
        axios.post("/chats", { participants });
      }
    }
  };

  return (
    <TinderCard
      className="swipe"
      onSwipe={onSwipe}
      preventSwipe={["up", "down"]}
      key={pup.name}
    >
      <div className="card" style={{ backgroundImage: `url(${pup.photoURL})` }}>
        <div id="pupBadge">
          <Button onClick={showStats}>
            <h3>{pup.name}</h3>
          </Button>
        </div>
      </div>
    </TinderCard>
  );
}
