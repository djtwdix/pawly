import axios from "axios";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import useLocationData from "../hooks/useLocationData";
//import filterPupsByDistance from "../helpers/filterPupsByDistance";
import PupCardInfo from "../components/PupCardInfo";
import PupCard from "../components/PupCard";
import useCardActions from './useCardActions';

export default function usePupData() {
  const user = auth.currentUser;
  const [pups, setPups] = useState([]);
  const { location } = useLocationData();
  const [showMatchAlert, setShowMatchAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState(null);
  const { showPhoto, photoController } = useCardActions();

  //gets all pups other than users for card stack, and pups for owner for pup list
  useEffect(() => {
    let mounted = true;
    if (user && location) {
      const getAllPups = async (user_id) => {
        const result = await axios.get("/pups/all");
        if (mounted) {
          setPups(result.data, location);
        }
      };
      getAllPups(user.uid);
    }
    return () => {
      mounted = false;
    };
  }, [user, location]);


  const setMatchAlertFalse = () => {
    if (showMatchAlert) {
      setShowMatchAlert(false);
    }
  };

  const removePup = () => {
    setPups((prev) => [...prev.slice(0, prev.length - 1)]);
    parsedPups.slice(0, parsedPups.length - 1);
    parsedPupsInfo.slice(0, parsedPups.length - 1);
    setLoading(false);
  };

  const parsedPups = pups.map((pup, index) => {
    return (
      <PupCard
        index={index}
        removePup={removePup}
        key={pup._id}
        pup={pup}
        user={user}
        owner={pup.owner_id}
        photoController={photoController}
        setShowMatchAlert={setShowMatchAlert}
        setChat={setChat}
        pups={pups}
      />
    );
  });

  const parsedPupsInfo = pups.map((pup, index) => {
    return (
      <PupCardInfo
        index={index}
        removePup={removePup}
        key={pup._id}
        pup={pup}
        user={user}
        owner={pup.owner_id}
        photoController={photoController}
        setShowMatchAlert={setShowMatchAlert}
        setChat={setChat}
        pups={pups}
      />
    );
  });

  return {
    parsedPups,
    parsedPupsInfo,
    showMatchAlert,
    setShowMatchAlert,
    setMatchAlertFalse,
    loading,
    showPhoto,
    chat
  };
}
