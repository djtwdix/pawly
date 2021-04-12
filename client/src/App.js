import "./stylesheets/App.scss"


//Components

import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import AddPupForm from "./components/AddPupForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AddPupForm />
    </div>
  );
}

export default App;
