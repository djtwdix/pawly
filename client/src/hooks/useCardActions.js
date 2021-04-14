import { useState } from "react";
import getUserById from "../helpers/getUserById";

export default function useCardActions() {
  const [showPhoto, setShowPhoto] = useState(true);

  const photoController = () => {
    if (!showPhoto) {
      setShowPhoto(true);
    } else {
    setShowPhoto(false);
    }
  };

  const checkMatch = async (userId, ownerId) => {
    const result = await getUserById(ownerId);
    const likes = result.data.likes;
    if (likes) {
      return likes.includes(userId) ? true : false;
    }
  };

  return { showPhoto, photoController, checkMatch };
}
