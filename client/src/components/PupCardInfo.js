import { Avatar, IconButton } from "@material-ui/core";
import TinderCard from "react-tinder-card";
import useCardActions from "../hooks/useCardActions";
import React from "react";
import axios from "axios";
import moment from "moment";
import EnergyIcon from "./EnergyIcon";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";

export default function PupCard({ pup, user, photoController }) {
  const { checkMatch } = useCardActions();

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
  };

  
  return ( 
   (<TinderCard
  className="swipe"
  onSwipe={onSwipe}
  preventSwipe={["up", "down"]}
  key={pup._id}
>
  <div className="card infoCard">
    <div id="pupBadge"> 
        <h3>{pup.name}</h3>
    </div>
    <div className="infoCard__details">
    <div className="infoCard__breedName"> 
    <Avatar style={{height: "80px", width: "80px", marginBottom: "0.5em"}} src={pup.photoURL} />
    <div>{pup.name}</div>
    </div>
    <div>{pup.breed}</div>
    <div>{pup.bio}</div>
    <EnergyIcon energy={pup.energy} />
    <div><FontAwesomeIcon className="inforCard__cake" icon={faBirthdayCake} /> {moment(pup.birthday).format("MMMM Do YYYY")} </div>
    <div className="infoCard__return">
       <IconButton onClick={(e) => photoController()}> 
         <KeyboardReturnIcon fontSize="large"/>
         </IconButton>
         </div>
    </div>
  </div>
</TinderCard> )
  );
}