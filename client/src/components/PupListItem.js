import React from "react";
import ListItemContainer from "./ListItemContainer";
import { Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import usePupData from "../hooks/usePupData"



export default function PupListItem({ pup }) {
  const { destroyPup } = usePupData();

  return (
    <Link to={{ pathname:`/pups/edit` , state: pup}}>
      <Button className="pupListItem__button">
        <section key={pup._id} className="pupListItem">
          <div className="pupListItem__avatarDetails">
          <Avatar
            alt={pup.name}
            className="pupListItem__avatar"
            src={pup.photoURL}
          ></Avatar>
          <div className="pupListItem__details">
            <h1>{pup.name}</h1>
            <p>{pup.breed}</p>
          </div>
          </div>
        </section>
      </Button>
      <div className="pupListItem__destroy">
        <Button>
         <DeleteForeverIcon onClick={() => destroyPup()}/> 
        </Button>
      </div>
    </Link>
  );
}
