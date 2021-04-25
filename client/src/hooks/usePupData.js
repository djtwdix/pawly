import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import useLocationData from "../hooks/useLocationData";
import filterPupsByDistance from "../helpers/filterPupsByDistance";

export default function usePupData() {
  const user = auth.currentUser;
  const [pups, setPups] = useState([]);
  const { location } = useLocationData();

  //gets all pups other than users for card stack, and pups for owner for pup list
  useEffect(() => {
    let mounted = true;
    if (user && location) {
      const getAllPups = async (user_id) => {
        const result = await axios.get("/pups/all");
        if (mounted) {
          setPups(filterPupsByDistance(result.data, location));
        }
      };
      getAllPups(user.uid);
    }
    return () => {
      mounted = false;
    };
  }, [user, location]);

  //adds a "bone" (like) to pup in DB
  const throwABone = (pupID) => {
    axios.put(`pups/${pupID}/bone`);
  };

  return {
    pups,
    setPups,
    throwABone,
  };
}
