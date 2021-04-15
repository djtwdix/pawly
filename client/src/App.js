import "./stylesheets/App.scss";
import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as comp from "./components";

function App() {
  const [user, loading] = useAuthState(auth);
  const [location, setLocation] = useState({});

  navigator.geolocation.getCurrentPosition((succ) => {
    console.log(succ);
  });
  console.log(location);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((succ) => {
      setLocation({
        type: "Point",
        coordinates: [succ.coords.longitude, succ.coords.latitude],
      });
      return;
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <comp.Navbar user={user} />
            {!loading && !user ? (
              <comp.SignIn location={location} />
            ) : (
              <comp.CardStack user={user} />
            )}
          </Route>
          <Route exact path="/chats">
            <comp.Navbar backButton={true} user={user} hideChatButton={true} />
            <comp.ChatList user={user} />
          </Route>
          <Route path="/chats/:chatID">
            <comp.Navbar backButton={true} user={user} />
            {user && <comp.ChatWindow user={user} />}
          </Route>
          <Route path="/users/:uid">
            <comp.Navbar backButton={true} user={user} />
            <comp.ProfileList />
          </Route>
          <Route exact path="/pups">
            <comp.Navbar backButton={true} user={user} />
            <comp.PupList user={user} />
          </Route>
          <Route path="/pups/new">
            <comp.Navbar backButton={true} user={user} />
            <comp.PupForm user={user} location={location}/>
          </Route>
          <Route path="/pups/:pupID">
            <comp.Navbar backButton={true} user={user} />
            <comp.EditPupForm user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
