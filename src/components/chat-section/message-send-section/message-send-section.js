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
import { useRef } from "react";

import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { useState } from "react";

var connection = (connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:44389/chathub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .build());

const MessageSend = () => {
  const [sendDummyMessageErrorCorrection, setsendDummyMessageErrorCorrection] =
    useState(() => {
      return true;
    });

  const fetchMessageData = useRef(null);

  useEffect(() => {
    // building the connection
    // the url must be end with the middleware chathub class name.

    // started the connection and it is js promise and if the connection is started correctly then block will be executed otherwise error.
    connection.start().then(
      () => {
        console.log("Connection started");
      },
      (error) => {
        console.log(error);
      }
    );

    setTimeout(() => {
      // making group first that whose are join into it
      connection
        .invoke(
          "JoinGroup",
          "Group 1",
          JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1]))
            .UserId
        )
        .then(
          () => {},
          (errors) => {
            console.log(errors);
          }
        );
    }, 1000);

    // best place to place the connection...
    connection.on("UserJoinGroup", (userId) => {
      console.log(userId + " is joined the group ");
    });

    connection.on(
      "SendMessage",
      (message, userId) => {
        console.log("UserId is: " + userId + " and message is: " + message);
      },
      (error) => {}
    );

    // for connect the user in group and it will be execute only one time and send empty message message without it host message does not shown to the connected users.
    // user joinned group
  }, []);

  function sendMessageHandler(event) {
    if (event.key == "Enter") {
      var user = JSON.parse(
        window.atob(localStorage.getItem("Token").split(".")[1])
      ).UserId;

      // calling the hub method without any kind of http request in the server side which is in inside the server-side hub-class
      // first parameter is use name of the method which is method in the sever-side hub and then parameters that you want to send it to that method..
      // if the method or different problems occurs then it uses the promises or async functionality so you can also handle the errors.
      // when this method send request to the server then server send the response data to the client-method and hit the "on" method and if name in bothside of connection are same then "on will be hit" and when On execution complete then invoke will be give you response.

      // when invoked called then this method will be execute and then when its execution is completed then invoke then will be execute
      connection
        .invoke(
          "SendMessageToGroup",
          fetchMessageData.current.value,
          JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1]))
            .UserId,
          "Group 1"
        )
        .then(
          () => {
            // if the data request is sended correctly to the server side and also respsonse correct then block execute otherwise error block.
            console.log("Sended message");
          },
          (errors) => {
            console.log(errors);
          }
        );
    }
  }

  function ReceiveMessage() {}

  function sendMessageHandlerOnClick() {}

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
              onKeyDown={sendMessageHandler}
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
