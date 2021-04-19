import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useLocation } from "react-router-dom";
import useLocationData from "../hooks/useLocationData";
import getDistanceByCoords from "../helpers/getDistanceByCoords";

export default function usePupData() {
  const user = auth.currentUser;
  const data = useLocation();
  const [pups, setPups] = useState([]);
  const { location } = useLocationData();
  const [userPups, setUserPups] = useState([]);

  //gets pupID by passed state prop on click of list item, used for below functions:
  let pupID = null;
  if (data.state) {
    pupID = data.state._id;
  }

  //gets all pups other than users for card stack, and pups for owner for pup list
  useEffect(() => {
    if (user && location) {
      const getAllPups = async (user_id) => {
        const result = await axios.get("/pups/all");
        setPups(
          result.data.filter((pup) => {
            if (location) {
              return (
                getDistanceByCoords(
                  pup.location.coordinates,
                  location.coordinates
                ) < 1000
              );
            }
            return null;
          })
        );
      };
      getAllPups(user.uid);
      const getPupsByOwnerId = async (owner_id) => {
        const result = await axios.get(`/users/${owner_id}/pups`);
        setUserPups(result.data);
      };
      getPupsByOwnerId(user.uid);
    }
  }, [user, location]);

  //posts new pup info to DB on pupform submit
  const addPup = (e, user, location, formData, photoURL) => {
    e.preventDefault();
    return axios.post("/pups", {
      ...formData,
      owner_id: user.uid,
      photoURL: photoURL,
      location: location,
    });
  };

  //edits pup in db and sets state of current pup to updated data
  const editPup = (e, user, location, formData, photoURL) => {
    e.preventDefault();
    return axios.put(`/pups/${pupID}`, {
      ...formData,
      _id: pupID,
      owner_id: user.uid,
      photoURL: photoURL,
    });
  };

  //adds a "bone" (like) to pup in DB
  const throwABone = (pupID) => {
    axios.put(`pups/${pupID}/bone`);
  };

  // removes selected pup from DB
  const destroyPup = (pupID, index) => {
    setUserPups((prev) => [...prev.filter((pup) => pup._id !== pupID)]);
    return axios.delete(`/pups/${pupID}`, {
      _id: pupID,
    });
  };

  return {
    addPup,
    pups,
    userPups,
    editPup,
    setPups,
    destroyPup,
    setUserPups,
    throwABone,
  };
}
