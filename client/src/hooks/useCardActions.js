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
    console.log("ownerId: ", ownerId);
    console.log("userId: ", userId);
    const result = await getUserById(ownerId);
    console.log("result: ", result.data);
    const likes = result.data.likes;
    console.log("likes: ", likes);
    return likes.includes(userId) ? true : false;
  };

  return { view, setView, showStats, checkMatch };
}
