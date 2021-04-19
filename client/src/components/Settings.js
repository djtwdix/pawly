import { Button } from "@material-ui/core";
import React from "react";

export default function Settings({ setSoundOff, soundOff }) {
  const toggleSound = () => {
    if (soundOff) {
      setSoundOff(false);
    } else {
      setSoundOff(true);
    }
  };
  return (
    <div className="settings">
      <Button className="settings__button" onClick={toggleSound}>
        Sound {soundOff ? "off" : "on"}
      </Button>
    </div>
  );
}
