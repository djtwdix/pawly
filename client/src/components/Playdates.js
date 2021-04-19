import React from "react";
import { Link } from "react-router-dom";
import ListItemContainer from "./ListItemContainer";
import { Add } from "@material-ui/icons";

export default function Playdates() {
  return (
    <section className="pupListItem__container">
      <Link to="/playdates">
        <ListItemContainer>
          <Add />
        </ListItemContainer>
      </Link>
    </section>
  );
}
