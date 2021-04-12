import { auth } from "../firebase/config"


export default function signOut(history) {
    auth
    .signOut()
    .then(() => {
      history.push("/");
    })
    .catch((error) => {
      // An error happened.
    });
};