import { Button } from '@material-ui/core';
import React from 'react';
import ListItemContainer from './ListItemContainer';
import signOut from "../helpers/signOut";
import { useHistory } from "react-router-dom"

export default function PofileList({ user }) {
  const history = useHistory();

  return (
    <div>
      <ListItemContainer>profile</ListItemContainer>
      <ListItemContainer>pups</ListItemContainer>
      <ListItemContainer>playdates</ListItemContainer>
      <ListItemContainer signOut={() => signOut(history)}>signout</ListItemContainer>
    </div>
  )
}
