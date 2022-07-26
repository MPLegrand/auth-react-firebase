import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import NavBar from './components/NavBar'
import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal";

function App() {
  return (
    <>
      <SignUpModal />
      <SignInModal />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;