import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MessageSendCss from "./message-send-section.module.css";
import {
  faArrowRightFromBracket,
  faCheck,
  faCoffee,
  faMessage,
  faMicrochip,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
const MessageSend = () => {
  return (
    <>
      <div className={MessageSendCss["chat-bottom"]}>
        <div className={MessageSendCss["message-send-section"]}>
          {/* microphone section */}
          <div className={MessageSendCss["send-and-file-open-icon"]}>
            <FontAwesomeIcon
              className={MessageSendCss["icon-color-hover"]}
              icon={faMicrophone}
            />
          </div>

          {/* send message section */}
          <div className={MessageSendCss["send-message-div"]}>
            <input type="text" placeholder="Type a message..." />
          </div>

          {/* send message and files icons */}
          <div className={MessageSendCss["send-and-file-open-icon"]}>
            <FontAwesomeIcon
              className={MessageSendCss["icon-color-hover"]}
              icon={faPaperclip}
            />{" "}
            &nbsp; &nbsp;
            <FontAwesomeIcon
              className={MessageSendCss["icon-color-hover"]}
              icon={faPaperPlane}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageSend;
