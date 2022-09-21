import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import RightMessageCss from "./right-message-section.module.css";

const RightMessageSection = (props) => {

  return (
    <>
      <div className={RightMessageCss["chat-message-right-main"]}>
        <div className={RightMessageCss["chat-right-message-text"]}>
          <span>{props.message.userMessage}</span>
        </div>
        <br />
        <br />
      </div>
      <div className={RightMessageCss["chat-right-message-meta"]}>
        <div>
          4:18 pm &nbsp;&nbsp;
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>
    </>
  );
};

export default RightMessageSection;
