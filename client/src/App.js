import "./stylesheets/App.scss";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as comp from "./components";
import { TrainRounded } from "@material-ui/icons";

function App() {
  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <comp.Navbar user={user} />
            {!loading && !user ? <comp.SignIn /> : <comp.CardStack user={user} />}
          </Route>
          <Route exact path="/chats" >
            <comp.Navbar backButton={true} user={user} hideChatButton={true}/>
            <comp.ChatList user={user}/>
          </Route>
          <Route path="/chats/:chatID">
            <comp.Navbar backButton={true} user={user} hideChatButton={true}/>
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
            <comp.PupForm user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
