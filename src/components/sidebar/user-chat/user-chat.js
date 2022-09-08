import React from "react";
import UserChatCss from "./user-chat.module.css";
import NoUserImg from "../../../assest/No Image.jpg";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useContext } from "react";
import LoggedInContext from "../../../context/loggedIn/loggedIn";
const UserChat = (props) => {
  const location = useLocation();
  const contextApi = useContext(LoggedInContext);
  function onClickContact() {
    if (location.pathname == "/Chats" && props.AddContactData) {
      props.changeSelectedContactEffect(props.index);
      props.showChatSection();
      props.selectedChatUperProfileData(props.AddContactData);
      contextApi.messageSectionOpenend(false);
      contextApi.showChatSectionThroughUserDetailProfileSection(null);
    } else if (props.AddContactData && location.pathname == "/AddContact") {
      props.showAddContactPanel(props.AddContactData);
      props.changeSelectedContactEffect(props.index);
      props.showChatSection();
      contextApi.messageSectionOpenend(false);
      contextApi.showChatSectionThroughUserDetailProfileSection(null);
    }
  }

  useEffect(() => {
    contextApi.showChatSectionThroughUserDetailProfileSection({});
  }, []);

  return (
    <>
      <div
        className={
          props.AddContactData.selectedContectStyle
            ? UserChatCss["selected-contect"]
            : UserChatCss["contact-border-bottom"]
        }
        onClick={onClickContact}
      >
        <div className={UserChatCss["main-contacts-section"]}>
          <div className={UserChatCss["contact-img"]}>
            <img
              src={
                props.AddContactData.userImage
                  ? props.AddContactData.userImage
                  : NoUserImg
              }
              alt=""
            />
          </div>

          <div className={UserChatCss["contact-name-and-messages"]}>
            <span>
              <strong>{props.AddContactData.contactName}</strong>
            </span>
            <p>
              {location.pathname == "/Chats"
                ? props.AddContactData.lastMessage.length > 28
                  ? props?.AddContactData?.lastMessage?.substring(0, 25) +
                    "...."
                  : props.AddContactData.lastMessage
                : props?.AddContactData?.aboutStatus?.length > 28
                ? props?.AddContactData?.aboutStatus?.substring(0, 25) + "...."
                : props?.AddContactData?.contactName}
            </p>
          </div>

          <div className={UserChatCss["date-connection-on"]}>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChat;
