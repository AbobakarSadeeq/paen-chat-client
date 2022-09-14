import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import leftMessageCss from "./left-message-section.module.css";

const LeftMessageSection = (props) => {
  return (
    <div className={leftMessageCss["chat-message-left-main"]}>
      <div className={leftMessageCss["chat-left-message-text"]}>
        <span>{props.message.userMessage}</span>
      </div><br />
      <div className={leftMessageCss["chat-left-message-meta"]}>
        <span>
          4:18 pm &nbsp;&nbsp;
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </div>
    </div>
  );
};

export default LeftMessageSection;
