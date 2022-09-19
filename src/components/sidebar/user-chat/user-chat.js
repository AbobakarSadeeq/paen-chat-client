import React from "react";
import UserChatCss from "./user-chat.module.css";
import NoUserImg from "../../../assest/No Image.jpg";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useContext } from "react";
import LoggedInContext from "../../../context/loggedIn/loggedIn";
import * as signalR from "@microsoft/signalr";

export var mySignalRconnection = (mySignalRconnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:44389/chathub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .build());

// connection must be start only once when you want to do the connect the user in list otherwise it will give u error
mySignalRconnection.start().then(
  () => {
    console.log("Connection started");
  },
  (error) => {
    console.log(error);
  }
);


const UserChat = (props) => {
  const location = useLocation();
  const contextApi = useContext(LoggedInContext);
  function onClickContact() {
    if (location.pathname == "/Chats" && props.AddContactData) {
      props.changeSelectedContactEffect(props.index);
      props.showChatSection();
      props.selectedChatUperProfileData(props.AddContactData);
      contextApi.messageSectionOpenend(false);
      contextApi.showChatSectionThroughUserDetailProfileSection(null);
    } else if (props.AddContactData && location.pathname == "/AddContact") {
      props.showAddContactPanel(props.AddContactData);
      props.changeSelectedContactEffect(props.index);
      props.showChatSection();

      contextApi.messageSectionOpenend(false);
      contextApi.showChatSectionThroughUserDetailProfileSection(null);
    }
  }

  useEffect(() => {
    // building the connection
    // the url must be end with the middleware chathub class name.
    // started the connection and it is js promise and if the connection is started correctly then block will be executed otherwise error.

    // for connect the user in group and it will be execute only one time and send empty message message without it host message does not shown to the connected users.
    // user joinned group
    if (props.sendMessageToServer == null) {
      setTimeout(() => {
        // making group first that whose are join into it
        mySignalRconnection
          .invoke(
            "JoinGroup",
            props?.AddContactData?.singleContactGroupConnectionId,
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
      mySignalRconnection.on("UserJoinGroup", (userId, groupName) => {
        console.log(
          userId + " is joined the group and group name is: " + groupName
        );
      });

      mySignalRconnection.on(
        "SendMessage",
        (message, userId) => {
          props.getSenderMessage(message);
        },
        (error) => {}
      );

      contextApi.showChatSectionThroughUserDetailProfileSection({});
    }
  }, [props.sendMessageToServer]);

  function sendMessageHandlerOnKey(sendMessageText) {
    //  console.log(props?.AddContactData?.singleContactGroupConnectionId);
    //  console.log(sendMessageText);
     return;
    // calling the hub method without any kind of http request in the server side which is in inside the server-side hub-class
    // first parameter is use name of the method which is method in the sever-side hub and then parameters that you want to send it to that method..
    // if the method or different problems occurs then it uses the promises or async functionality so you can also handle the errors.
    // when this method send request to the server then server send the response data to the client-method and hit the "on" method and if name in bothside of connection are same then "on will be hit" and when On execution complete then invoke will be give you response.

    // when invoked called then this method will be execute and then when its execution is completed then invoke then will be execute
    // mySignalRconnection
    //   .invoke(
    //     "SendMessageToGroup",
    //     sendMessageText,
    //     "ZSJUQDW" // when select on chat then get its group value means that chat is user sending data
    //   )
    //   .then(
    //     () => {
    //       // if the data request is sended correctly to the server side and also respsonse correct then block execute otherwise error block.
    //       console.log("Sended message");
    //     },
    //     (errors) => {
    //       console.log(errors);
    //     }
    //   );
  }

  return (
    <>
      <div
        className={
          props.AddContactData.selectedContectStyle
            ? UserChatCss["selected-contect"]
            : UserChatCss["contact-border-bottom"]
        }
        onClick={onClickContact}
      >
        <div className={UserChatCss["main-contacts-section"]}>
          <div className={UserChatCss["contact-img"]}>
            <img
              src={
                props.AddContactData.userImage
                  ? props.AddContactData.userImage
                  : NoUserImg
              }
              alt=""
            />
          </div>

          <div className={UserChatCss["contact-name-and-messages"]}>
            <span>
              <strong>
                {props.AddContactData.contactName == " "
                  ? props.AddContactData.phoneNumber
                  : props.AddContactData.contactName}
              </strong>
            </span>
            <p>
              {location.pathname == "/Chats"
                ? props.AddContactData.lastMessage.length > 28
                  ? props?.AddContactData?.lastMessage?.substring(0, 25) +
                    "...."
                  : props.AddContactData.lastMessage
                : props?.AddContactData?.aboutStatus?.length > 28
                ? props?.AddContactData?.aboutStatus?.substring(0, 25) + "...."
                : props?.AddContactData?.contactName}
            </p>
          </div>

          <div className={UserChatCss["date-connection-on"]}>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChat;
