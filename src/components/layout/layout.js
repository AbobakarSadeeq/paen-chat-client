import React, { useState } from "react";
import Chat from "../chat-section/chat-section";
import Sidebar from "../sidebar/sidebar";
import layoutCss from "./layout.module.css";
import AddContactModel from "../../Models/add-contact-model/add-contact-model";
import Home from "../home/home";
import ContectDetail from "../sidebar/add-contact/contect-detail/contect-detail";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Layout = (props) => {
  const location = useLocation();
  const [openContactModel, setContactModel] = useState(() => {
    return false;
  });

  const [showChat, setShowChat] = useState(() => {
    return false;
  });

  const [showContectRightSidePane, setShowContectRightSidePane] = useState(
    () => {
      return null;
    }
  );

  const [showContactDetail, setShowContactDetail] = useState(() => {
    return false;
  });

  function contactAddModel() {
    setContactModel(!openContactModel);
  }

  function changeViewww() {
    if (location.pathname == "/Chats") {
      setShowChat(true);
      setShowContactDetail(false);
    } else if (location.pathname == "/AddContact") {
      setShowContactDetail(true);
      setShowChat(false);
    }
  }

  useEffect(() => {}, [showContectRightSidePane]);

  return (
    <>
      {/* Models */}
      {openContactModel ? (
        <AddContactModel hideDialog={contactAddModel} />
      ) : null}

      <div className={layoutCss["main-layout"]}>
        <Sidebar
          addContactOpen={setContactModel}
          showChatSectionn={changeViewww}
          selectedNewContactObj={(data) => {
            setShowContectRightSidePane(data);
          }}
        />

        {/* {props.addContetPanelShow ? <ContectDetail /> : null} */}
        {showChat || showContectRightSidePane ? "" : <Home />}

        {showContactDetail ? (
          <ContectDetail detail={showContectRightSidePane} />
        ) : null}

        {showChat ? <Chat /> : null}
      </div>
    </>
  );
};

export default Layout;
