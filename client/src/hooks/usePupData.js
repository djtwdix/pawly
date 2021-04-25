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
    if (user && location) {
      const getAllPups = async (user_id) => {
        const result = await axios.get("/pups/all");
        setPups(filterPupsByDistance(result.data, location));
      };
      getAllPups(user.uid);
    }
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
