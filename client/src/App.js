import "./stylesheets/App.scss"


//Components

import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import AddPupForm from "./components/AddPupForm";
import PupsList from "./components/PupsList"
import Pup from "./components/Pup"

function App() {
  return (
    <div className="App">
      <Navbar />
     {/* <AddPupForm /> */}
     <Pup />

    </div>
  );
}

export default App;
