import React, { memo, useCallback, useState } from "react";
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
import ChatSection from "../chat-section/chat-section";
import ContactContext from "../../context/contact-context/contact-context";

const Layout = (props) => {
  console.log(props.viewChangeToChatSectionFromUserDetailViewUserInfo);
  const location = useLocation();
  const contextContactApi = useContext(ContactContext);
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

  const [messageNotficationSendedFromOtherContactId ,setMessageNotficationSendedFromOtherContactId] = useState(()=>{
    return 0;
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
      if(showChat !== true) {
        setShowChat(true);

      }

      // this block will be execute when in chat route selected chat-specific person.

      if(showContactDetail !== false) {
        setShowContactDetail(false);
      }

      // hide sidebar
    } else if (location.pathname == "/AddContact") {
      setShowContactDetail(true);
      setShowChat(false);
    }
  }

  const changeViewMemoize = useCallback(()=>{
    if (location.pathname == "/Chats") {
      if(showChat !== true) {
        setShowChat(true); // here masla

      }

      // this block will be execute when in chat route selected chat-specific person.

      if(showContactDetail !== false) {
        setShowContactDetail(false);
      }

      // hide sidebar
    } else if (location.pathname == "/AddContact") {
      setShowContactDetail(true);
      setShowChat(false);
    }
  }, [location.pathname, showChat, showContactDetail])



  function senderMessageHandler(value) {
    setGettingUserMessage(value);
  }

  function mutateConnectedInMessageContact(groupId) {
    setConnectedInMessageGroupId(groupId);
  }

  useEffect(() => {



      // this is here profile data is store in this prop => props.viewChangeToChatSectionFromUserDetail
    if (
      props.viewChangeToChatSectionFromUserDetail != null &&
      !props.chatSectionOpenedFromContactDetail // => it means false if chat section was not opened
    ) {
      contextApi.showChatSectionThroughUserDetailProfileSection(null);
      //setShowContactDetail(true);
    } else if (
      props.viewChangeToChatSectionFromUserDetail &&
      props.chatSectionOpenedFromContactDetail
    ) {
      setShowContactDetail(false); //  here contact-detail section is closed and opend the chat-section from add-contact section THIS IS TRUE AND VALID FORM.
    }
  }, [props.chatSectionOpenedFromContactDetail]);



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
          showChatSectionn={changeViewMemoize}
          selectedNewContactObj={(data) => {
            setShowContectRightSidePane(data);
          }}
          profileUperData={(data) => {
            setUperProfileData(data);
              setShowChat(true);
          }}
        //  senderMessageVal={props.sendMessageVal}
          gettingSenderMessage={senderMessageHandler}
          messageDataSendedFromUser={gettingUserMessage}
          closeContactDetailInResponsiveMobile={
            props.closeContactDetailForMobileResponsive
          }
          connectUserInMessageSectionThroughGroupId={connectedInMessageGroupId}
          showChat={showChat}
          messageSendedFromContactNotify={messageNotficationSendedFromOtherContactId}
        />

        {/* {props.addContetPanelShow ? <ContectDetail /> : null} */}
        {showChat || showContectRightSidePane ? "" : <Home />}

        {showContactDetail && !props.chatSectionOpenedFromContactDetail ? (
          <ContectDetail
            detail={showContectRightSidePane}
            isShowContactDetail={props.closeContactDetailForMobileResponsive}

          />
        ) : null}

          {/* this chat will execute when chat section open from chat route */}
        {showChat == true && contextApi.getShowChatSection == true ? (
          <ChatSection
            singleUserChatAllInfo={uperProfileData}
            senderMessageObj={props.sendMessageVal}
            senderMessageData={gettingUserMessage}
            mutateConnectedInMessageHandler={mutateConnectedInMessageContact}
            notificationFromContactArrayIndexOfNewMessageOfOtherUserEvenReceiverIsOnline={setMessageNotficationSendedFromOtherContactId}
          />
        ) : null}

        {/* when User detail opened from add-contact route and then open the messeage or chat section this chat will execute.
        and this will exeucte when chat-section is opened from the user-detail */}
        {props.viewChangeToChatSectionFromUserDetailViewUserInfo &&
        props.chatSectionOpenedFromContactDetail ? (
          <ChatSection
            singleUserChatAllInfo={props.viewChangeToChatSectionFromUserDetailViewUserInfo } // this props is nothing passing here

            senderMessageObj={props.sendMessageVal}
            senderMessageData={gettingUserMessage}
            mutateConnectedInMessageHandler={mutateConnectedInMessageContact}
          />
        ) : null}
      </div>
    </>
  );
};

export default memo(Layout);
