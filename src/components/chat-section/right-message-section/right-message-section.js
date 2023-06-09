import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import RightMessageCss from "./right-message-section.module.css";

const RightMessageSection = (props) => {
  const messagesEndRef = useRef(null);

  const [messageSendTime, setMessageSendTime] = useState(() => {
    return "";
  });


  const scrollToBottom = () => {

    setTimeout(()=>{
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    },100)
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

  }, []);

  return (
    <>
      <div className={RightMessageCss["chat-message-right-main"]}>
        <div className={RightMessageCss["chat-right-message-text"]}>
          <span>{props.singleMessage.userMessage}</span>
        </div>
        <br />
        <br />
      </div>
      <div className={RightMessageCss["chat-right-message-meta"]}>
        <div>
          {props.singleMessage.messageTimeStamp} &nbsp;&nbsp;
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>
    {/* <div ref={messagesEndRef}></div> */}

    </>
  );
};

export default RightMessageSection;
