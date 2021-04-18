import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import axios from "axios";
import getUserById from "../helpers/getUserById";
import firebase from "firebase/app";

export default function useUserData() {
  const user = auth.currentUser;
  const [charRemaining, setCharRemaining] = useState(140);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")

  const addBio = () => {
    console.log(bio);
    axios.put(`/users/${user.uid}/bio`, {
      bio: bio
    });
  }

  useEffect(() => {
    if (user) {
      getUserById(user.uid)
        .then((res) => {
         const currentUser = res.data
          const currentBio = currentUser.bio;
          setBio(currentBio)
          console.log('current bio:', currentBio);
          setCharRemaining(140 - bio.length);
        }
        )
    }
  }, [user])


  const handleChange = (e) => {
    setBio(e.target.value);
    if (e.target.name === "bio") {
      setCharRemaining(140 - e.target.value.length);
    }

    console.log(bio);
  };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
       setName(user.displayName);
       setEmail(user.email);
       setPhoto(user.photoURL);
    } 
  });

  return { addBio, handleChange, bio, name, email, photo, charRemaining };
}