import logo from "./logo.svg";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Layout from "../src/components/layout/layout";
import Auth from "./components/Auth/auth";
import { useEffect, useState } from "react";
import LoggedInContext from "./context/loggedIn/loggedIn";
import { useLocation, useNavigate } from "react-router";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(() => {
    return false;
  });

  const [
    changeUserProfileViewToItsChatSection,
    setChangeUserProfileViewToItsChatSection,
  ] = useState(() => {
    return null;
  });

  const [newUserMessageSectionOpened, setNewUserMessageSectionOpened] =
    useState(() => {
      return false;
    }, []);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      if (JSON.parse(localStorage.getItem("Token")).ProfileAddValid) {
        setLoggedIn(true);
        navigate("/Chats");
      }
    }
  }, [loggedIn]);

  function removeDataFromChangeUserChatSection() {
    // if (changeUserProfileViewToItsChatSection != null && location.pathname == "/Chats") {
    //   setChangeUserProfileViewToItsChatSection(null);
    // }
  }

  return (
    <LoggedInContext.Provider
      value={{
        isLoggedIn: setLoggedIn,
        showChatSectionThroughUserDetailProfileSection:
          setChangeUserProfileViewToItsChatSection,
        messageSectionOpenend: setNewUserMessageSectionOpened,
      }}
    >
      {loggedIn && localStorage.getItem("Token") != null ? (
        <>
          <Layout
            viewChangeToChatSectionFromUserDetail={
              changeUserProfileViewToItsChatSection
            }
            newUserMessagedOpen={newUserMessageSectionOpened}
          />
        </>
      ) : (
        <Auth />
      )}
    </LoggedInContext.Provider>
  );
}

export default App;
