import { useState } from "react";
import useUserData from "./useUserData";

export default function useCardActions() {
  const [view, setView] = useState(false);
  const { getUserById } = useUserData();
  const showStats = () => {
    if (!view) {
      setView(true);
    }
    setView(false);
  };

  const checkMatch = async (userId, ownerId) => {
    const result = await getUserById(ownerId);
    const likes = result.data.likes;
    return likes && likes.includes(userId) ? true : false;
  };

  return { view, setView, showStats, checkMatch };
}
