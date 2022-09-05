import logo from "./logo.svg";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Layout from "../src/components/layout/layout";
import Auth from "./components/Auth/auth";
import { useEffect, useState } from "react";
import LoggedInContext from "./context/loggedIn/loggedIn";
import { useNavigate } from "react-router";

function App() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(() => {
    return false;
  });



  useEffect(() => {
    if (localStorage.getItem("Token")) {
      if (JSON.parse(localStorage.getItem("Token")).ProfileAddValid) {
        setLoggedIn(true);
        navigate("/Chats");
      }
    }

   
  }, [loggedIn]);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn: setLoggedIn  }}>
      {loggedIn && localStorage.getItem("Token") != null ? (
        <Layout  />
      ) : (
        <Auth />
      )}
    </LoggedInContext.Provider>
  );
}

export default App;
