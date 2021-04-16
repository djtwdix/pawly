import { IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import TinderCard from "react-tinder-card";
import SwipeButtons from "./SwipeButtons";
import useCardActions from "../hooks/useCardActions";
import React, { useMemo } from "react";
import axios from "axios";
import usePupData from "../hooks/usePupData";

export default function PupCard({ pup, user, photoController, removePup }) {
  const { checkMatch } = useCardActions();
  const { pups } = usePupData();

  console.log(pups);

/*   const childRefs = useMemo(
    () =>
      Array(pups.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );
 */
  const onSwipe = async (direction) => {
    if (direction === "right") {
      axios.put(`/users/${user.uid}/likes`, {
        likeId: pup.owner_id,
      });
      const isMatch = await checkMatch(user.uid, pup.owner_id);
      if (isMatch) {
        const participants = [user.uid, pup.owner_id];
        axios.post("/chats", {
          participants,
          last_message: { text: "Say hello!" },
        });
      }
    }
    removePup();
  };

  return (
    <>
      <TinderCard
        className="swipe"
        onSwipe={(dir) => onSwipe(dir)}
        preventSwipe={["up", "down"]}
        key={pup._id}
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
      <SwipeButtons onSwipe={onSwipe} />
    </>
  );
}
