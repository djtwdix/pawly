import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

export default function usePupData() {
  const user = auth.currentUser;
  const [userPups, setUserPups] = useState([]);

  //gets all pups other than users for card stack, and pups for owner for pup list
  useEffect(() => {
    let mounted = true;
    if (user) {
      const getPupsByOwnerId = async (owner_id) => {
        const result = await axios.get(`/users/${owner_id}/pups`);
        if (mounted) {
          setUserPups(result.data);
        }
      };
      getPupsByOwnerId(user.uid);
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  // removes selected pup from DB
  const destroyPup = (pupID, index) => {
    setUserPups((prev) => [...prev.filter((pup) => pup._id !== pupID)]);
    return axios.delete(`/pups/${pupID}`, {
      _id: pupID,
    });
  };

  return {
    userPups,
    destroyPup,
    setUserPups,
  };
}
