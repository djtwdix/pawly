import "./stylesheets/App.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useLocationData from "./hooks/useLocationData";
import useSettings from "./hooks/useSettings";
import * as comp from "./components";

function App() {
  const [user, loading] = useAuthState(auth);
  const { soundOff, setSoundOff } = useSettings();

  const { location } = useLocationData();

  return (
    <div className="App">
      <Router>
        <Switch>
          <comp.AuthChecker user={user} loading={loading} coords={location}>
            <Route exact path="/">
              <comp.Navbar user={user} />
              <comp.CardStack user={user} soundOff={soundOff} />
            </Route>
            <Route exact path="/chats">
              <comp.Navbar backButton={"/"} user={user} hideChatButton={true} />
              <comp.ChatList user={user} />
            </Route>
            <Route path="/chats/messages">
              <comp.Navbar backButton={"/chats"} user={user} />
              {user && <comp.ChatWindow user={user} />}
            </Route>
            <Route path="/playdates">
              <comp.Navbar backButton={"/profile"} user={user} />
              {user && <comp.Playdates user={user} />}
            </Route>
            <Route exact path="/profile">
              <comp.Navbar backButton={"/"} user={user} />
              <comp.ProfileList user={user} />
            </Route>
            <Route exact path="/settings">
              <comp.Navbar backButton={"/profile"} user={user} />
              <comp.Settings
                user={user}
                setSoundOff={setSoundOff}
                soundOff={soundOff}
              />
            </Route>
            <Route exact path="/pups">
              <comp.Navbar backButton={"/profile"} user={user} />
              <comp.PupList user={user} />
            </Route>
            <Route path="/pups/new">
              <comp.Navbar backButton={"/pups"} user={user} />
              <comp.EditPupForm user={user} location={location} />
            </Route>
            <Route path="/pups/edit">
              <comp.Navbar backButton={"/pups"} user={user} />
              <comp.EditPupForm user={user} location={location} />
            </Route>
            <Route path="/profile/:id">
              <comp.Navbar backButton={"/profile"} user={user} />
              <comp.UserProfile user={user} />
            </Route>
          </comp.AuthChecker>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
