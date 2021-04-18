import React from "react";
import Navbar from "./Navbar";
import SignIn from "./SignIn";

export default function AuthChecker({ children, user, loading, coords }) {
  console.log(coords);
  return (
    <div>
      {!loading && !user ? (
        <>
          <Navbar user={user} hideChatButton={true} />
          <SignIn coords={coords} />
        </>
      ) : (
        !loading && children
      )}
    </div>
  );
}
