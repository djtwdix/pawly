import SignIn from "./components/SignIn";

import Navbar from './components/Navbar';
import AddPupForm from './components/AddPupForm';



function App() {
  return (
    <div className="App">
      <Navbar />
      <SignIn />
      <AddPupForm />
    
      {/* <SignIn /> */}
    </div>
  );
}

export default App;
