import React from "react";
import MessageSenderCss from "./message-sender-profile.module.css";

const MessageSenderProfile = () => {
  return (
    <>
      <div className={MessageSenderCss["user-profile"]}>
        <div className={MessageSenderCss["profile-img"]}>
          <img
            src={require("./../../../assest/chat-logo/favicon.ico")}
            alt=""
          />{" "}
          &nbsp;&nbsp;
        </div>

        <div className={MessageSenderCss["user-name-and-status"]}>
          <span>
            <strong>Abobakar Sadeeq</strong>
          </span>
          <p>Online</p>
        </div>

        <div className={MessageSenderCss["profile-img"]}>
          <img
            src={require("./../../../assest/chat-logo/favicon.ico")}
            alt=""
          />{" "}
          &nbsp;&nbsp;
        </div>
      </div>
    </>
  );
};

export default MessageSenderProfile;
