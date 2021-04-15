import React from "react";
import { Button } from "@material-ui/core";

export default function ListItemContainer({ children, signOut }) {
  return (
    <div>
      <Button
        className="listItemContainer pupListItemListItem"
        style={{ textTransform: "none" }}
        onClick={signOut ? signOut : undefined}
      >
        {" "}
        {children}
      </Button>
    </div>
  );
}
