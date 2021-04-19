import React from "react";
import ListItemContainer from "./ListItemContainer";
import signOut from "../helpers/signOut";
import { Link, useHistory } from "react-router-dom";

export default function ProfileList({ user }) {
  const history = useHistory();
  return (
    <div className="profileList">
      <Link to={{ pathname: `/profile/${user.uid}` }}>
        <ListItemContainer>PROFILE</ListItemContainer>
      </Link>
      <Link to="/pups">
        <ListItemContainer>PUPS</ListItemContainer>
      </Link>
      <Link to="/playdates">
        <ListItemContainer>PLAYDATES</ListItemContainer>
      </Link>
      <Link to="/settings">
        <ListItemContainer>SETTINGS</ListItemContainer>
      </Link>
      <ListItemContainer signOut={() => signOut(history)}>
        SIGN OUT
      </ListItemContainer>
    </div>
  );
}
