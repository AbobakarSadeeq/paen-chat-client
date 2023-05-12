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
import MessageContextApi from "./context/message-context/message-context-api";

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

  const [updatedContactName, setUpdatedContactName] = useState(() => {
    return "";
  });

  const [
    closeContactDetailOnMobileResponsiveness,
    setCloseContactDetailOnMobileResponsiveness,
  ] = useState(() => {
    return false;
  });

  const [showChatSection, setShowChatSection] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      if (JSON.parse(localStorage.getItem("Token")).ProfileAddValid) {
        setLoggedIn(true);
        navigate("/Chats?main-chat-section");
      }
    }
  }, [loggedIn]);

  function removeDataFromChangeUserChatSection() {
    // if (changeUserProfileViewToItsChatSection != null && location.pathname == "/Chats") {
    //   setChangeUserProfileViewToItsChatSection(null);
    // }
  }

  const [messageVal, setMessageVal] = useState(() => {
    return null;
  });


  const [showSideBarSection, setShowSideBarSection] = useState(() => {
    return true;
  });

  function messageSendedHandler(val) {
    setMessageVal(val);
  }

  function callShowContactDetailHandler(selectChatSectionFromRouteName) {
    if (selectChatSectionFromRouteName == "AddContact") {
      setCloseContactDetailOnMobileResponsiveness((prevs) => {
        return !prevs;
      });
    } else if (selectChatSectionFromRouteName == "chat") {
      // when it clicked the hide the sidebar
      // so here i have to hide the sidebar
      setShowSideBarSection((prevs) => {
        return !prevs;
      });
    }
  }
  console.log(showChatSection);
  return (
    <LoggedInContext.Provider
      value={{
        isLoggedIn: setLoggedIn,
        showChatSectionThroughUserDetailProfileSection:
          setChangeUserProfileViewToItsChatSection,
        messageSectionOpenend: setNewUserMessageSectionOpened,
        updatedContactNameVal: setUpdatedContactName,
        showContactDetailHandler: callShowContactDetailHandler,
        showChatSectionAssign: setShowChatSection,
        getShowChatSection: showChatSection,
        setShowSideBarSection:setShowSideBarSection,
        getShowSideBarSection:showSideBarSection
      }}
    >
      {loggedIn && localStorage.getItem("Token") != null ? (
        <>
          <MessageContextApi.Provider
            value={{ sendMessageFunc: messageSendedHandler }}
          >
            <Layout
              viewChangeToChatSectionFromUserDetail={
                changeUserProfileViewToItsChatSection
              }
              newUserMessagedOpen={newUserMessageSectionOpened}
              ContactNameEdited={updatedContactName}
              sendMessageVal={messageVal}
              closeContactDetailForMobileResponsive={
                closeContactDetailOnMobileResponsiveness
              }
            />
          </MessageContextApi.Provider>
        </>
      ) : (
        <Auth />
      )}
    </LoggedInContext.Provider>
  );
}

export default App;
