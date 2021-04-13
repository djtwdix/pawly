import { Add } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import ListItemContainer from "./ListItemContainer";
import PupListItem from "./PupListItem";
import { Link } from "react-router-dom";
import usePupData from "../hooks/usePupData";

export default function PupList({ user }) {
  const { getPupsByOwnerId } = usePupData();
  const [userPups, setUserPups] = useState([]);

  useEffect(() => {
    if (user) {
      getPupsByOwnerId(user.uid)
        .then((res) => {
          setUserPups(res.data);
        })
        .catch((err) => {
          console.log("err: ", err.message);
        });
    }
  }, [user]);

  const parsedPups = userPups.map((pup) => {
    return <PupListItem key={pup._id} pup={pup} />;
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
