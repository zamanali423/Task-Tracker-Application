import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import { useContext } from "react";
import { userContext } from "./context/userContext/userContext";

function App() {
  const { user } = useContext(userContext);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {user ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
