import { Add } from "@material-ui/icons";
import React , { useState, useEffect }  from "react";
import ListItemContainer from "./ListItemContainer"
import Pup from "./Pup";

export default function PupsList({ user }) {
  const [pups, setPups] = useState([]);


    const parsedPups = pups.map((/* pup */) => {
      return (
       <Pup />
      );
    });




  return (
      <section>
        {parsedPups}
        <ListItemContainer>
          {/* <Link to={"/pups/new"}> */}
           
            <Add />

        {/* </Link> */}
        </ListItemContainer>
      </section>
    );

}