import React from "react";
import { Button } from "@material-ui/core";

export default function ListItemContainer({ children, signOut }) {
  return (
    <div className="listItemContainer">
      <Button
        className="listItemContainer"
        style={{ textTransform: "none" }}
        onClick={signOut ? signOut : undefined}
      >
        {" "}
        {children}
      </Button>
    </div>
  );
}
