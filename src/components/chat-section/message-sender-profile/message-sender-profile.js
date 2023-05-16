import React, { useContext } from "react";
import MessageSenderCss from "./message-sender-profile.module.css";
import NoUserImg from "../../../assest/No Image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import LoggedInContext from "../../../context/loggedIn/loggedIn";
import { useLocation } from "react-router";
const MessageSenderProfile = (props) => {
  const contextApi = useContext(LoggedInContext);
  const path = useLocation();

  function goBackwardPage() {
    const selectedQueryParameterName = path.search;
    if (selectedQueryParameterName == "?AddContact") {
      contextApi.messageSectionOpenend(false);
      contextApi.showContactDetailHandler("AddContact"); // it backs to add-contact page
    } else if (selectedQueryParameterName == "?main-chat-section") {
     // contextApi.messageSectionOpenend(false);
     contextApi.setShowSideBarSection(true);
     contextApi.showChatSectionAssign(false); // turn it off
  //  contextApi.showContactDetailHandler("chat");

    }
  }

  return (
    <>
      <div className={MessageSenderCss["user-profile"]}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={goBackwardPage}
          className={MessageSenderCss["back-btn-to-Contact"]}
        />
        <div className={MessageSenderCss["profile-img"]}>
          <img
            src={props.profile?.userImage ? props.profile.userImage : NoUserImg}
            alt=""
          />{" "}
          &nbsp;&nbsp;
        </div>

        <div className={MessageSenderCss["user-name-and-status"]}>
          <span>
            <strong>
              {props?.profile?.contactName != "" &&
              props?.profile?.contactName != " " &&
              props?.profile?.contactName != null
                ? props?.profile?.contactName
                : props?.profile?.phoneNumber}{" "}
              Abobakar Sadeeq
            </strong>
          </span>
          <p className={MessageSenderCss["isUserOnline"]}>online</p>
        </div>

        <div className={MessageSenderCss["edit-btn"]}>
          <FontAwesomeIcon icon={faEllipsisV} /> &nbsp;&nbsp;
        </div>
      </div>
    </>
  );
};

export default MessageSenderProfile;
