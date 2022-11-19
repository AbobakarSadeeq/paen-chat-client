import React from "react";
import ChatCss from "./chat-section.module.css";
import LeftMessageSection from "./left-message-section/left-message-section";
import RightMessageSection from "./right-message-section/right-message-section";
import MessageSend from "./message-send-section/message-send-section";
import MessageSenderProfile from "./message-sender-profile/message-sender-profile";
import { useEffect } from "react";
import { useContext } from "react";
import LoggedInContext from "../../context/loggedIn/loggedIn";
import { useState } from "react";
import MessageContextApi from "../../context/message-context/message-context-api";
import { mySignalRconnection } from "../sidebar/user-chat/user-chat";
import { useRef } from "react";
const Chat = (props) => {
  const messagesEndRef = useRef(null);
  const contextApi = useContext(MessageContextApi);
  const [chatMessage, setChatMessage] = useState(() => {
    return [...props.singleUserChatAllInfo.singleConnectedUserMessagesList];
  });

  const [newMessagesAdded, setNewMessagesAdded] = useState(() => {
    return [];
  });

  function userMessageHandler(val) {
    let myArr = [...chatMessage];
    let myArrObj = {
      userMessage: val,
      senderId: props.singleUserChatAllInfo.userItSelfId,
      reciverId: props.singleUserChatAllInfo.usersConnectedId,
      message_Type: "text",
      messageSeen: true,
    };
    contextApi.sendMessageFunc(myArrObj);
    myArr.push(myArrObj);
    setChatMessage((pervsVal) => {
      return myArr;
    });

    mySignalRconnection
      .invoke(
        "SendMessageToGroup",
        myArrObj,
        props?.singleUserChatAllInfo?.singleContactGroupConnectionId // when select on chat then get its group value means that chat is user sending data
      )
      .then(
        () => {
          // if the data request is sended correctly to the server side and also respsonse correct then block execute otherwise error block.
          console.log("Sended message");
          scrollToBottom();
        },
        (errors) => {
          console.log(errors);
        }
      );

    // storing new messages inside the message for to store that messages inside the database.

    let sendMessageObj = {
      userMessage: val,
      senderId: props.singleUserChatAllInfo.userItSelfId,
      reciverId: props.singleUserChatAllInfo.usersConnectedId,
      message_Type: "text",
      messageSeen: true,
      messageTimeStamp: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      messageDateStamp: new Date().toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }),
    };

    setNewMessagesAdded(() => {
      return [...newMessagesAdded, sendMessageObj];
    });
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (props.senderMessageData) {
      if (
        props.senderMessageData.senderId !=
        JSON.parse(window.atob(localStorage.getItem("Token")?.split(".")[1]))
          .UserId
      ) {
        let selectedChatAllMessages = chatMessage;
        console.log("Reciver data onlyyyyyyyy");
        selectedChatAllMessages.push(props.senderMessageData);
        // this array is used for to show the message on the chat and also show the pervious message as well
        setChatMessage((pervsVal) => {
          return [...selectedChatAllMessages];
        });

        // ******** List database data on session expire *********
        // this array will add new message to array only and it will be only used for to send that list when session is over
        // if last data is not stored then the problem is here. solution is found when data is sending to the backend then the state will be having update data.
        let storingMessageCustomizeObj = {
          userMessage: props.senderMessageData.userMessage,
          senderId: props.senderMessageData.senderId,
          reciverId: props.senderMessageData.reciverId,
          message_Type: "text",
          messageSeen: true,
          messageTimeStamp: new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          messageDateStamp: new Date().toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
          }),
        };

        setNewMessagesAdded((perviousData) => {
          return [...perviousData, storingMessageCustomizeObj];
        });
      }
    }

    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return (ev.returnValue = "Are you sure you want to close?");
    });

    scrollToBottom();
  }, [props.senderMessageData]);

  return (
    <>
      <div>
        {/* profile section */}

        <MessageSenderProfile profile={props.singleUserChatAllInfo} />
        {/* chat read section */}

        <div className={ChatCss["chat-read-section"]}>
          {chatMessage ? (
            chatMessage?.map((singleMessage, index) => {
              let customObj = {
                ...singleMessage,
              };

              delete customObj["senderUser"];
              delete customObj["reciverUser"];
              if (
                props.singleUserChatAllInfo.userItSelfId ==
                singleMessage.senderId
              ) {
                // other user sended message to you

                return <RightMessageSection key={index} message={customObj} />;
              }
              // you have sended message to the connected user
              if (
                props.singleUserChatAllInfo.usersConnectedId ==
                singleMessage.senderId
              ) {
                return <LeftMessageSection key={index} message={customObj} />;
              }
            })
          ) : (
            <>No message with this chat</>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {/* message send section */}
        <MessageSend userMessageHandler={userMessageHandler} />
      </div>
    </>
  );
};
export default Chat;
