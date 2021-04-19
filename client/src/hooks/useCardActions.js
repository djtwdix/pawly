import { useState } from "react";
import getUserById from "../helpers/getUserById";

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

  //checks if each user is in each others like array
  const checkMatch = async (userId, ownerId) => {
    const result = await getUserById(ownerId);
    const likes = result.data.likes;
    if (likes) {
      return likes.includes(userId) ? true : false;
    }
  };

  return { showPhoto, photoController, checkMatch };
}
