import "./stylesheets/App.scss";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

//Components

import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import AddPupForm from "./components/AddPupForm";
import PupsList from "./components/PupsList"
import Pup from "./components/Pup"

function App() {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  return (
    <div className="App">
      <Navbar />
     {/* <AddPupForm /> */}
     <Pup />

    </div>
  );
}

export default App;
