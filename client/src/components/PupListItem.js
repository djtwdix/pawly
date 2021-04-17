import React from "react";
import { Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import usePupData from "../hooks/usePupData";
import { useHistory } from "react-router-dom";

export default function PupListItem({ pup, index, destroyPup }) {
  const history = useHistory();
  return (
    <section style={{ display: "flex", justifyContent: "space-between" }}>
      <Link to={{ pathname: `/pups/edit`, state: pup }}>
        <Button
          style={{ backgroundColor: "transparent" }}
          className="pupListItem__button"
          disable={true}
        >
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
      </Link>
      <div style={{ display: "flex" }}>
        <Button
          className="pupListItem__edit"
          onClick={() => history.push("/pups/edit")}
        >
          <EditIcon />
        </Button>
        <Button className="pupListItem__destroy">
          <DeleteForeverIcon onClick={() => destroyPup(pup._id, index)} />
        </Button>
      </div>
    </section>
  );
}
