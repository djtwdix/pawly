import { Avatar, IconButton } from "@material-ui/core";
import TinderCard from "react-tinder-card";
import useCardActions from "../hooks/useCardActions";
import React, { useMemo } from "react";
import SwipeButtons from "./SwipeButtons";
import axios from "axios";
import moment from "moment";
import EnergyIcon from "./EnergyIcon";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake , faBone } from "@fortawesome/free-solid-svg-icons";
import GenderIcon from "./GenderIcon";
import usePupData from "../hooks/usePupData";

export default function PupCard({
  pup,
  user,
  photoController,
  removePup,
  setShowMatchAlert,
  index,
}) {
  const { checkMatch } = useCardActions();

  const { pups, throwABone } = usePupData();

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

  const onSwipe = async (direction) => {
    if (direction === "right") {
      axios.put(`/users/${user.uid}/likes`, {
        likeId: pup.owner_id,
      });
      throwABone(pup._id)
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
        preventSwipe={["down"]}
        key={pup._id}
        onCardLeftScreen={() => removePup()}
      >
        <div className="pupCard infoCard">
          <div className="infoCard__details">
            <div className="infoCard__header">
              <Avatar
                style={{
                  height: "110px",
                  width: "110px",
                  marginBottom: "0.5em",
                  position: "relative",
                  top: "40px",
                  right: "15px",
                }}
                src={pup.photoURL}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                className="infoCard__breedName"
                style={{
                  marginLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <h1>{pup.name}</h1>
                </div>
                <div>
                  <h4>{pup.breed}</h4>
                </div>
                <div className="infoCard__bones">
                  <FontAwesomeIcon className="infoCard__bone" icon={faBone} /> 
                 <h6>{pup.name} has {pup.bones} bones</h6>
                  </div>
                <div className="infoCard__genderEnergy">
                  <GenderIcon gender={pup.gender} />
                  <EnergyIcon energy={pup.energy} />
                  <FontAwesomeIcon
                    className="infoCard__cake"
                    icon={faBirthdayCake}
                  />
                  <h6>{` ${moment(pup.birthday).format("MMMM Do YYYY")}`}</h6>
                </div>
              </div>
            </div>
            <div className="infoCard__main">
              <div className="infoCard__bio">{pup.bio}</div>
            </div>
            <div className="infoCard__return">
              <IconButton onClick={(e) => photoController()}>
                <KeyboardReturnIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        </div>
      </TinderCard>
      <SwipeButtons swipe={swipe} throwABone={throwABone} id={pup._id} />
    </>
  );
}
