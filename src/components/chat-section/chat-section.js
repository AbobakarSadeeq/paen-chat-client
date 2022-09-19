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

const Chat = (props) => {
  console.log(props);
  const contextApi = useContext(MessageContextApi);
  const [chatMessage, setChatMessage] = useState(() => {
    return [...props.singleUserChatAllInfo.singleConnectedUserMessagesList];
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
        },
        (errors) => {
          console.log(errors);
        }
      );
  }

  useEffect(() => {
    if (props.senderMessageObj) {
      let selectedChatAllMessages = chatMessage;
      selectedChatAllMessages.push(props.senderMessageObj);
      console.log(selectedChatAllMessages);
      setChatMessage((pervsVal) => {
        return selectedChatAllMessages;
      });
    }
  }, [props.senderMessageObj]);

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
              return <LeftMessageSection key={index} message={customObj} />;
            })
          ) : (
            <>No message with this chat</>
          )}
        </div>

        {/* message send section */}
        <MessageSend userMessageHandler={userMessageHandler} />
      </div>
    </>
  );
};

export default Chat;
