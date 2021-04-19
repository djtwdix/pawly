import { auth } from "../firebase/config"
import axios from "axios";

export default function signOut(history) {
    auth
    .signOut()
    .then(() => {
      history.push("/");
      axios.post("/users/signOut");
    })
    .catch((error) => {
      // An error happened.
    });
};