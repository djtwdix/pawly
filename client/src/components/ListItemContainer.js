import { Button } from "@material-ui/core";
import "../stylesheets/ListItemContainer.scss";
import React from "react";

export default function ListItemContainer( { children }) {
  return (
    <div className="listItemContainer">
      <Button className="listItemContainer"> { children }</Button>
    </div>
  );
}
