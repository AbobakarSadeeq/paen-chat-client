import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MessageSendCss from "./message-send-section.module.css";
import {
  faMicrophone,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { useState } from "react";
import { useContext } from "react";
import MessageContextApi from "../../../context/message-context/message-context-api";

const MessageSend = () => {
  const contextApi = useContext(MessageContextApi);

  const [sendDummyMessageErrorCorrection, setsendDummyMessageErrorCorrection] =
    useState(() => {
      return true;
    });

  const fetchMessageData = useRef(null);

  useEffect(() => {}, []);

  function sendMessageHandlerOnKey(event) {
    if (event.key == "Enter") {
      contextApi.sendMessageFunc({
        messageVal: fetchMessageData.current.value,
        senderId: JSON.parse(
          window.atob(localStorage.getItem("Token").split(".")[1])
        ).UserId,
      });
    }
  }

  function ReceiveMessage() {}

  function sendMessageHandlerOnClick() {
    contextApi.sendMessageFunc(fetchMessageData.current.value);
  }

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
            <input
              ref={fetchMessageData}
              type="text"
              placeholder="Type a message..."
              onKeyDown={sendMessageHandlerOnKey}
            />
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
              onClick={sendMessageHandlerOnClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageSend;
