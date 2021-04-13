import React from "react";
import firebase from "firebase/app";
import { auth } from "../firebase/config.js";
import axios from "axios";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: (userObj) => {
      axios.post("/users", {
        _id: userObj.user.uid,
        name: userObj.user.displayName,
        email: userObj.user.email,
        photoURL: userObj.user.photoURL,
      });
    },
  },
};

export default function SignIn() {
  return (
    <div className="signInForm">
      <div className="signInForm__card">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    </div>
  );
}
