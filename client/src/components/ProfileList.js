import React from "react";
import ListItemContainer from "./ListItemContainer";
import signOut from "../helpers/signOut";
import { Link, useHistory } from "react-router-dom";

export default function ProfileList({ user }) {
  const history = useHistory();

  return (
    <div className="profileList">
      <ListItemContainer>PROFILE</ListItemContainer>
      <Link to="/pups">
        <ListItemContainer>PUPS</ListItemContainer>
      </Link>
      <ListItemContainer>PLAYDATES</ListItemContainer>
      <ListItemContainer>SETTINGS</ListItemContainer>
      <ListItemContainer signOut={() => signOut(history)}>
        SIGN OUT
      </ListItemContainer>
    </div>
  );
}
