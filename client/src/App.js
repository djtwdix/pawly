import SignIn from "./components/SignIn";
import Navbar from './components/Navbar';
import AddPupForm from './components/AddPupForm';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SignIn />
      <AddPupForm />
    </div>
  );
}

export default App;
