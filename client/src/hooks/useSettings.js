import { useState } from "react";

export default function useLocationData() {
  const [soundOff, setSoundOff] = useState(true);

  return {
    soundOff,
    setSoundOff,
  };
}
