import { Button } from "@material-ui/core";
import "../stylesheets/ListItemContainer.scss";
import React from "react";

export default function ListItemContainer( { children, signOut }) {
  return (
    <div className="listItemContainer">
      <Button className="listItemContainer" onClick={signOut ? signOut: undefined}> { children }</Button>
    </div>
  );
}
