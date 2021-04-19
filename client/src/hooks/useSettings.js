import { useState } from "react";

//function to handle turning match alert sound in settings menu
export default function useLocationData() {
  const [soundOff, setSoundOff] = useState(true);

  return {
    soundOff,
    setSoundOff,
  };
}
