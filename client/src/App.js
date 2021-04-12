import "./stylesheets/App.scss";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

//Components

import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import AddPupForm from "./components/AddPupForm";
import ListItemContainer from "./components/ListItemContainer";

function App() {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  return (
    <div className="App">
      <Navbar user={user} />
      <ListItemContainer />
      {!user && <SignIn />}
    </div>
  );
}

export default App;
