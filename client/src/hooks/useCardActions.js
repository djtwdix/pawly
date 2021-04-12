import { useState } from "react";

export default function useCardActions() {
  const [view, setView] = useState(false);

  const showStats = () => {
    if (!view) {
      setView(true);
    }
    setView(false);
  };

  const checkMatch = (user, pup) => {
    const match = pup.owner.likes.includes(user.uid) ? true : false;

    return match;
  };

  return { view, setView, showStats, checkMatch };
}
