import { useState } from "react";
import getUserById from "../helpers/getUserById";

export default function useCardActions() {
  const [view, setView] = useState(false);

  const showStats = () => {
    if (!view) {
      setView(true);
    }
    setView(false);
  };

  const checkMatch = async (userId, ownerId) => {
    const result = await getUserById(ownerId);
    const likes = result.data.likes;
    if (likes) {
      return likes.includes(userId) ? true : false;
    }
  };

  return { view, setView, showStats, checkMatch };
}
