import "./stylesheets/App.scss";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

//Components

import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import AddPupForm from "./components/AddPupForm";
import PupsList from "./components/PupsList";
import Pup from "./components/Pup";
import ChatList from "./components/ChatList";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CardStack from "./components/CardStack";

function App() {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar user={user} />
            {user ? <CardStack /> : <SignIn />}
          </Route>
          <Route exact path="/chats">
            <Navbar />
            <ChatList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
