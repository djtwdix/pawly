import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import useLocationData from "../hooks/useLocationData";
import getNearPups from "../helpers/getNearPups";

export default function usePupData() {
  const user = auth.currentUser;
  const [pups, setPups] = useState([]);
  const { location } = useLocationData();
  const [userPups, setUserPups] = useState([]);

  //gets all pups other than users for card stack, and pups for owner for pup list
  useEffect(() => {
    if (user && location) {
      const getAllPups = async (user_id) => {
        const result = await axios.get("/pups/all");
        setPups(getNearPups(result.data, location));
      };
      getAllPups(user.uid);
    }
  }, [user, location]);

  return {
    pups,
    userPups,
    setPups,
    setUserPups,
  };
}
