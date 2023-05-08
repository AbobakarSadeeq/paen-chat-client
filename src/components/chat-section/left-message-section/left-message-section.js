import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { date } from "yup";
import leftMessageCss from "./left-message-section.module.css";

const LeftMessageSection = (props) => {
  const messagesEndRef = useRef(null);
  const [messageSendTime, setMessageSendTime] = useState(() => {
    return "";
  });
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const dateTime = new Date();
    setMessageSendTime(
      dateTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
    scrollToBottom();
  }, []);

  return (
    <div className={leftMessageCss["chat-message-left-main"]}>
      <div className={leftMessageCss["chat-left-message-text"]}>
        <span>{props.message.userMessage}</span>
     
      </div>
      <br />
      <div className={leftMessageCss["chat-left-message-meta"]}>
        <span>
          {messageSendTime} &nbsp;&nbsp;
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </div>
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default LeftMessageSection;
