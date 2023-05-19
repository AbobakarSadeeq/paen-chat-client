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
import { useContext } from "react";
import LoggedInContext from "../../context/loggedIn/loggedIn";

const Layout = (props) => {
  const location = useLocation();
  const contextApi = useContext(LoggedInContext);

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

  const [uperProfileData, setUperProfileData] = useState(() => {
    return {};
  });

  const [contectAddRefresh, setContectAddRefresh] = useState(() => {
    return false;
  });

  const [gettingUserMessage, setGettingUserMessage] = useState(() => {
    return null;
  });

  const [connectedInMessageGroupId, setConnectedInMessageGroupId] = useState(()=>{
    return "";
  })

  function refreshMyContect() {
    setContectAddRefresh(() => {
      return true;
    });
  }

  function contactAddModel() {
    setContactModel(!openContactModel);
  }

  function changeViewww() {
    if (location.pathname == "/Chats") {
      setShowChat(true);
      setShowContactDetail(false);
      // hide sidebar
    } else if (location.pathname == "/AddContact") {
      setShowContactDetail(true);
      setShowChat(false);
    }
  }

  function senderMessageHandler(value) {
    setGettingUserMessage(value);
  }

  function mutateConnectedInMessageContact(groupId) {
    setConnectedInMessageGroupId(groupId);
  }

  useEffect(() => {
    if (
      props.viewChangeToChatSectionFromUserDetail != null &&
      !props.newUserMessagedOpen
    ) {
      contextApi.showChatSectionThroughUserDetailProfileSection(null);
      //setShowContactDetail(true);
    } else if (
      props.viewChangeToChatSectionFromUserDetail &&
      props.newUserMessagedOpen
    ) {
      setShowContactDetail(false);
    }
  }, [props.newUserMessagedOpen]);

  return (
    <>
      {/* Models */}
      {openContactModel ? (
        <AddContactModel
          hideDialog={contactAddModel}
          // refreshMyContect={refreshMyContect} // changes
        />
      ) : null}

      <div className={layoutCss["main-layout"]}>
        <Sidebar
          EditContactName={props.ContactNameEdited}
          //  refreshingContect={contectAddRefresh}  // changes
          addingContactDone={openContactModel}
          addContactOpen={setContactModel}
          showChatSectionn={changeViewww}
          selectedNewContactObj={(data) => {
            setShowContectRightSidePane(data);
          }}
          profileUperData={(data) => {
            setUperProfileData(data);
          }}
          senderMessageVal={props.sendMessageVal}
          gettingSenderMessage={senderMessageHandler}
          messageDataSendedFromUser={gettingUserMessage}
          closeContactDetailInResponsiveMobile={
            props.closeContactDetailForMobileResponsive
          }
          connectUserInMessageSectionThroughGroupId={connectedInMessageGroupId}
        />

        {/* {props.addContetPanelShow ? <ContectDetail /> : null} */}
        {showChat || showContectRightSidePane ? "" : <Home />}

        {showContactDetail && !props.newUserMessagedOpen ? (
          <ContectDetail
            detail={showContectRightSidePane}
            isShowContactDetail={props.closeContactDetailForMobileResponsive}
          />
        ) : null}

        {showChat == true && contextApi.getShowChatSection == true ? (
          <Chat
            singleUserChatAllInfo={uperProfileData}
            senderMessageObj={props.sendMessageVal}
            senderMessageData={gettingUserMessage}
            mutateConnectedInMessageHandler={mutateConnectedInMessageContact}

          />
        ) : null}

        {/* User detail messeage section. */}
        {props.viewChangeToChatSectionFromUserDetail &&
        props.newUserMessagedOpen ? (
          <Chat
            singleUserChatAllInfo={props.viewChangeToChatSectionFromUserDetail}
            senderMessageObj={props.sendMessageVal}
            mutateConnectedInMessageHandler={mutateConnectedInMessageContact}
          />
        ) : null}
      </div>
    </>
  );
};

export default Layout;
