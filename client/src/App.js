import "./stylesheets/App.scss"


//Components

import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import AddPupForm from "./components/AddPupForm";
import Pups from "./components/Pups"

function App() {
  return (
    <div className="App">
      <Navbar />
     {/* <AddPupForm /> */}
     <Pups />

    </div>
  );
}

export default App;
