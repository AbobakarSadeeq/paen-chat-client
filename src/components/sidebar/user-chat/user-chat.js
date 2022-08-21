import React from "react";
import UserChatCss from "./user-chat.module.css";

const UserChat = (props) => {
  function onClickContact() {
    props.showUserChat(true);
  }

  return (
    <>
      <div className={UserChatCss["contact-border-bottom"]} onClick={onClickContact}>
        <div className={UserChatCss["main-contacts-section"]}>
          <div className={UserChatCss["contact-img"]}>
            <img
              src={require("../../../assest/chat-logo/favicon.ico")}
              alt=""
            />
          </div>

          <div className={UserChatCss["contact-name-and-messages"]}>
            <span>
              <strong>Abobakar Sadeeq</strong>
            </span>
            <p>hi how are you sadeeq</p>
          </div>

          <div className={UserChatCss["date-connection-on"]}>
            <span>Mar 25</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChat;
