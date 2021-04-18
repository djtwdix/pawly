import React from "react";
import Navbar from "./Navbar";
import SignIn from "./SignIn";
import { useHistory } from "react-router-dom";

export default function AuthChecker({ children, user, loading }) {
  return (
    <div>
      {!loading && !user ? (
        <>
          <Navbar user={user} hideChatButton={true} />
          <SignIn />
        </>
      ) : (
        !loading && children
      )}
    </div>
  );
}
