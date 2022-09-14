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

const Chat = (props) => {
  const [singleChatLiveMessageStorage, setSingleChatLiveMessageStorage] =
    useState(() => {
      return [...props.singleUserChatAllInfo.singleConnectedUserMessagesList];
    });

  useEffect(() => {

    // do not send all message array here below code is just for checking purpose.
    // store the message data on database when goto next component or page or next contact. then store only that new message array in database. for now
    // there is multiple ways to do it so, becarful choice right path.

    if (props.senderMessageObj) {
      let myArrObj = [
        {
          userMessage: props.senderMessageObj.messageVal,
          senderId: props.singleUserChatAllInfo.userItSelfId,
          reciverId: props.singleUserChatAllInfo.usersConnectedId,
        },
      ];
      setSingleChatLiveMessageStorage((pervsVal) => {
        console.log([...pervsVal, ...myArrObj]);
        return [...pervsVal, ...myArrObj];
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
          {singleChatLiveMessageStorage?.map(
            (singleMessage, index) => {
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
            }
          )}
        </div>

        {/* message send section */}
        <MessageSend />
      </div>
    </>
  );
};

export default Chat;
