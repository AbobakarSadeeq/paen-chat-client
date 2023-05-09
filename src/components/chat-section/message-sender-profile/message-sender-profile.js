import React from "react";
import MessageSenderCss from "./message-sender-profile.module.css";
import NoUserImg from "../../../assest/No Image.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
const MessageSenderProfile = (prop) => {
  return (
    <>
      <div className={MessageSenderCss["user-profile"]}>
      <FontAwesomeIcon icon={faArrowLeft} className={MessageSenderCss["back-btn-to-Contact"]}/>
        <div className={MessageSenderCss["profile-img"]}>
          <img
            src={prop.profile?.userImage ? prop.profile.userImage : NoUserImg}
            alt=""
          />{" "}
          &nbsp;&nbsp;
        </div>

        <div className={MessageSenderCss["user-name-and-status"]}>
          <span>
            <strong>
              {prop?.profile?.contactName != "" &&
              prop?.profile?.contactName != " " &&
              prop?.profile?.contactName != null
                ? prop?.profile?.contactName
                : prop?.profile?.phoneNumber}{" "}
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
