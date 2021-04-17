import { IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import TinderCard from "react-tinder-card";
import SwipeButtons from "./SwipeButtons";
import useCardActions from "../hooks/useCardActions";
import React, { useMemo } from "react";
import axios from "axios";
import usePupData from "../hooks/usePupData";

export default function PupCard({
  pup,
  user,
  photoController,
  removePup,
  index,
  setShowMatchAlert,
}) {
  const { checkMatch } = useCardActions();
  const { pups } = usePupData();

  const childRefs = useMemo(
    () =>
      Array(pups.length)
        .fill(0)
        .map((i) => React.createRef()),
    [pups]
  );

  const swipe = (direction) => {
    if (pups.length) {
      childRefs[index].current.swipe(direction);
    }
  };

  const onSwipe = async (direction, id) => {
    if (direction === "right") {
      axios.put(`/users/${user.uid}/likes`, {
        likeId: pup.owner_id,
      });
      const isMatch = await checkMatch(user.uid, pup.owner_id);
      if (isMatch) {
        setShowMatchAlert(true);
        const participants = [user.uid, pup.owner_id];
        axios.post("/chats", {
          participants,
          last_message: { text: "Say hello!" },
        });
      }
    }
  };

  return (
    <>
      <TinderCard
        ref={childRefs[index]}
        className="swipe"
        onSwipe={(dir) => onSwipe(dir)}
        preventSwipe={["up", "down"]}
        key={pup._id}
        onCardLeftScreen={() => removePup()}
      >
        <div
          className="pupCard"
          style={{ backgroundImage: `url(${pup.photoURL})` }}
        >
          <div className="pupBadge">
            <h3>{pup.name}</h3>
          </div>
          <div className="pupCard__info">
            <IconButton onClick={(e) => photoController()}>
              <InfoIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
      </TinderCard>
      <SwipeButtons swipe={swipe} />
    </>
  );
}
