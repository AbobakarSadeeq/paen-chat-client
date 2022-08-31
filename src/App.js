import logo from "./logo.svg";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Layout from "../src/components/layout/layout";
import Auth from "./components/Auth/auth";
import { useEffect, useState } from "react";
import LoggedInContext from "./context/loggedIn/loggedIn";

function App() {
  // const [loggedIn, setLoggedIn] = useState(() => {
  //   if (localStorage.getItem("Token")) {
  //     return true;
  //   }
  //   return false;
  // });

  const [loggedIn, setLoggedIn] = useState(() => {
    return false;
  });

  const [profileValid, setProfileValid] = useState(false);

  let renderView = null;
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      if (JSON.parse(localStorage.getItem("Token")).ProfileAddValid) {
        setLoggedIn(true);
      }
    }
  }, [loggedIn]);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn: setLoggedIn }}>
      {loggedIn && localStorage.getItem("Token") != null ? (
        <Layout />
      ) : (
        <Auth />
      )}
      {/* {renderView} */}
    </LoggedInContext.Provider>
  );
}

export default App;
