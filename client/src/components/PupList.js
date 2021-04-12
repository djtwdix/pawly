import { Add } from "@material-ui/icons";
import React , { useState, useEffect }  from "react";
import ListItemContainer from "./ListItemContainer"
import Pup from "./Pup";
import { Link } from "react-router-dom"

export default function PupList({ user }) {
  const [pups, setPups] = useState([]);


    const parsedPups = pups.map((/* pup */) => {
      return (
       <Pup />
      );
    });




  return (
      <section>
        {parsedPups}
        <Link to="/pups/new">
          <ListItemContainer>
            <Add />
          </ListItemContainer>
        </Link>
      </section>
    );

}