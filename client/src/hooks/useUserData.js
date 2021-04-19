import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import axios from "axios";
import getUserById from "../helpers/getUserById";

export default function useUserData() {
  const user = auth.currentUser;
  const [charRemaining, setCharRemaining] = useState(240);
  const [bio, setBio] = useState("");

  const addBio = () => {
    console.log(bio);
    axios.put(`/users/${user.uid}/bio`, {
      bio: bio,
    });
  };

  useEffect(() => {
    if (user) {
      getUserById(user.uid).then((res) => {
        const currentUser = res.data;
        const currentBio = currentUser.bio;
        setBio(currentBio);
      });
    }
  }, [user]);

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
