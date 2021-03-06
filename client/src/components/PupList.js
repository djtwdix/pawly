import { Add } from "@material-ui/icons";
import React from "react";
import ListItemContainer from "./ListItemContainer";
import PupListItem from "./PupListItem";
import { Link } from "react-router-dom";
import useUserPupData from "../hooks/useUserPupData";

export default function PupList({ user }) {
  const { userPups, destroyPup } = useUserPupData();

  const parsedPups = userPups.map((pup, index) => {
    return (
      <PupListItem
        destroyPup={destroyPup}
        key={pup._id}
        pup={pup}
      />
    );
  });

  return (
    <section className="pupListItem__container">
      {parsedPups}
      <Link to="/pups/new">
        <ListItemContainer>
          <Add />
        </ListItemContainer>
      </Link>
    </section>
  );
}
