import React from "react";
import ChatCss from "./chat-section.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCoffee,
  faMessage,
  faMicrochip,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
  return (
    <>
      <div>
        {/* profile section */}
        <div className={ChatCss["user-profile"]}>
          <div className={ChatCss["profile-img"]}>
            <img src={require("../../assest/chat-logo/favicon.ico")} alt="" />{" "}
            &nbsp;&nbsp;
          </div>

          <div className={ChatCss["user-name-and-status"]}>
            <span>
              <strong>Abobakar Sadeeq</strong>
            </span>
            <p>Online</p>
          </div>

          <div className={ChatCss["profile-img"]}>
            <img src={require("../../assest/chat-logo/favicon.ico")} alt="" />{" "}
            &nbsp;&nbsp;
          </div>
        </div>

        {/* chat read section */}
        <div className={ChatCss["chat-read-section"]}></div>

        {/* message send section */}
        <div className={ChatCss["chat-bottom"]}>
          <div className={ChatCss["message-send-section"]}>
            {/* microphone section */}
            <div className={ChatCss["send-and-file-open-icon"]}>
              <FontAwesomeIcon
                className={ChatCss["icon-color-hover"]}
                icon={faMicrophone}
              />
            </div>

            {/* send message section */}
            <div className={ChatCss["send-message-div"]}>
              <input type="text" placeholder="Type a message..." />
            </div>

            {/* send message and files icons */}
            <div className={ChatCss["send-and-file-open-icon"]}>
              <FontAwesomeIcon
                className={ChatCss["icon-color-hover"]}
                icon={faPaperclip}
              />{" "}
              &nbsp; &nbsp;
              <FontAwesomeIcon
                className={ChatCss["icon-color-hover"]}
                icon={faPaperPlane}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
