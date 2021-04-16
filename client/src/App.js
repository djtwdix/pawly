import "./stylesheets/App.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useLocationData from "./hooks/useLocationData";
import * as comp from "./components";

function App() {
  const [user, loading] = useAuthState(auth);
  const { location } = useLocationData();
  console.log('location: ', location);

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
          <Route path="/chats/messages">
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
            <comp.EditPupForm user={user} location={location} />
          </Route>
          <Route path="/pups/edit">
            <comp.Navbar backButton={true} user={user} />
            <comp.EditPupForm user={user} location={location} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
