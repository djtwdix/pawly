import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import axios from "axios";
import getUserById from "../helpers/getUserById";

export default function useUserData() {
  const user = auth.currentUser;
  const [charRemaining, setCharRemaining] = useState(240);
  const [bio, setBio] = useState("");

  //adds information of user bio form to database
  const addBio = () => {
    axios.put(`/users/${user.uid}/bio`, {
      bio: bio,
    });
  };

  //get user info to populate profile and updates bio on bio update
  useEffect(() => {
    if (user) {
      getUserById(user.uid).then((res) => {
        const currentUser = res.data;
        const currentBio = currentUser.bio;
        setBio(currentBio);
      });
    }
  }, [user]);

  //logs changes in bio form upon entry
  const handleChange = (e) => {
    setBio(e.target.value);
    if (e.target.name === "bio") {
      setCharRemaining(240 - e.target.value.length);
    }
  };

  return {
    addBio,
    handleChange,
    bio,
    charRemaining,
  };
}
