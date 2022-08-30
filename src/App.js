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

  const [loggedIn, setLoggedIn] = useState(()=>{
    return false;
  })

  useEffect(() => {
    console.log("Called " + loggedIn);
  }, [loggedIn]);

  let userLoggedIn = loggedIn ? (
    <Layout />
  ) : (
    <>
      <Auth />
    </>
  );
  return (
    <LoggedInContext.Provider value={{ isLoggedIn: setLoggedIn }}>
      {userLoggedIn}
    </LoggedInContext.Provider>
  );
}

export default App;
