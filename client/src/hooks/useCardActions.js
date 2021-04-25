import { useState } from "react";
import axios from "axios";

export default function useCardActions() {
  const [showPhoto, setShowPhoto] = useState(true);

  //enables state change (front/back) of pupCard w/ pupCardInfo
  const photoController = () => {
    if (!showPhoto) {
      setShowPhoto(true);
    } else {
      setShowPhoto(false);
    }
  };

  //adds a "bone" (like) to pup in DB
  const throwABone = (pupID) => {
    axios.put(`pups/${pupID}/bone`);
  };

  return { showPhoto, photoController, throwABone };
}
