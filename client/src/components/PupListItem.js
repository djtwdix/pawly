import React from "react";
import ListItemContainer from "./ListItemContainer";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom"

export default function PupListItem({ pup }) {
  return (
    <ListItemContainer>
      <Link to={`/pups/${pup._id}`}>
      <section key={pup._id} className="pupListItem">
        <Avatar alt={pup.name} src={pup.photoURL}></Avatar>
        <div className="pupListItem__details">
          <h1>{pup.name}</h1>
          <p>{pup.breed}</p>
        </div>
      </section>
      </Link>
    </ListItemContainer>
  );
}
