import React, { memo } from "react";
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

import { useRef } from "react";
import axios from "axios";
import { signalRConnectionSingletonObj } from "../Auth/auth";
import FetchingMessagesContext from "../../context/fetching-message-context/fetching-message-context";

const Chat = (props) => {
  // context api's
  const contextApi = useContext(MessageContextApi);
  const fetchingMessagesContext = useContext(FetchingMessagesContext);
  const contextApiForChatSection = useContext(LoggedInContext);
  // **********************************************************

  // states of chat components

  // 1. message to store here on both side sender as well as receiver
  const [chatMessage, setChatMessage] = useState(() => {
    return []; // props.singleUserChatAllInfo.singleConnectedUserMessagesList
  });

  // 3. groups name that single user connected with it

  const [userConnectedWithUserGroupsName, setUserConnectedWithUserGroupName] =
    useState(() => {
      return [];
    });

  const [checkUserChangeContactObject, setCheckUserChangeContactObject] = useState();

  // **********************************************************

  // refs varibles
  const messagesEndRef = useRef(null);

  // **********************************************************

  // use effects

  // useEffect(() => {

  //     // if user sended message to the receiver then if condition will be true here this will be exeucte when message sended from one user to anther
  //   if (props.senderMessageData && props.senderMessageData.senderId !=
  //     JSON.parse(window.atob(localStorage.getItem("Token")?.split(".")[1])).UserId) {
  //     let selectedChatAllMessages = chatMessage;
  //     selectedChatAllMessages.push(props.senderMessageData);

  //     // this array is used for to show the real time message on the chat and also show the pervious message as well

  //     setChatMessage((pervsVal) => {
  //       return [...selectedChatAllMessages];
  //     });

  //     // it will give us advantage when user want to disccount him self then whose he/she connected chat then it will be remove the data from them that are already store in db.
  //     // group will be used for to find the connection

  //     // console.log(props.singleUserChatAllInfo.singleContactGroupConnectionId);
  //     let fetchingDataFromSate = userConnectedWithUserGroupsName;
  //     let findingUserGroup = fetchingDataFromSate.indexOf(props.singleUserChatAllInfo.singleContactGroupConnectionId);

  //     if (findingUserGroup == -1) {

  //       setUserConnectedWithUserGroupName((prevData) => {
  //         return [
  //           ...prevData,
  //           props.singleUserChatAllInfo.singleContactGroupConnectionId,
  //         ];
  //       });

  //     }

  //   }

  //   // ************************************************

  //   // calling scrollToBottom method for execute when data is changed inside the component
  //   scrollToBottom();

  //   // whenever user send a message and the user want to go offline or closing browser then before closing browsing send data to db...
  //   // ClosingOrRefreshingChatSession();
  // }, [props.senderMessageData]);

  useEffect(() => {

    // NOTE!
    // THIS USEEFFECT WILL EXECUTE TWO TIME BECAUSE WHEN CHAT_SECTION COMPONENT OPENED THEN IT WILL SEND DATA TO THE SIDEBAR COMPONENT
    // THEN SIDEBAR WILL EXECUTE THE USEEFFECT AND WHEN THAT SIDEBAR EXECUTE IT WILL RE_RESEND THE DATA TO CHAT_SECTION FOR INITIAL_MESSAGE ARRAY

    // empty the state because when ever message sended then update remove the other all message or add its the user those message which are stored in redis
    // here -----TASK----- whenever user make or change the contact then fetch the data from the redis here first.

    if (checkUserChangeContactObject !== props.singleUserChatAllInfo) {
      setChatMessage(() => {
        return [];
      });

      setCheckUserChangeContactObject(() => {
        return props.singleUserChatAllInfo;
      });
    }else {
    if(fetchingMessagesContext?.singleConversationInitialMessage?.fetchedMessagesList) {
      // reversing the array for to show the initial message correct way and assigning to the list.
      let customizingArr = [];
      let reverseIndex = fetchingMessagesContext.singleConversationInitialMessage.fetchedMessagesList.length - 1;
      for(let startFromLastIndex = reverseIndex -1; startFromLastIndex>=0; startFromLastIndex--) {
        customizingArr.push({
          groupId:props?.singleUserChatAllInfo?.groupId,
          clientMessageRedis: fetchingMessagesContext.singleConversationInitialMessage.fetchedMessagesList[startFromLastIndex]
        })
      }

      setChatMessage(()=>{
        return [...customizingArr];
      });

    }

  }




    // fetching the data from the sidbar single-chat-initiial value and this below code will execute the sidebar useEffect

    if(fetchingMessagesContext.selectedContactGroupForToFetchingItsMessage !== props?.singleUserChatAllInfo?.groupId) {
      fetchingMessagesContext.setSelectedContactGroupForToFetchingItsMessage(props?.singleUserChatAllInfo?.groupId);
    }



    const loggedInUserId = +JSON.parse(
      window.atob(localStorage.getItem("Token")?.split(".")[1])
    ).UserId;

    signalRConnectionSingletonObj.on("ReceiveingSenderMessageFromConnectedContactUser",(receivingSenderData) => {
      if (loggedInUserId === receivingSenderData.clientMessageRedis.receiverId) {
          const currentTime = new Date().toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          });

          const currentDate = new Date().toLocaleDateString([], {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          });

         let myArr = [...chatMessage];

          let messageSendObj = {
            groupId: props?.singleUserChatAllInfo?.groupId,
            clientMessageRedis: {
              userMessage: receivingSenderData.clientMessageRedis.userMessage,
              senderId: receivingSenderData.clientMessageRedis.senderId,
              receiverId: loggedInUserId,
              messageSeen: false,
              messageTimeStamp:currentTime,
              messageDateStamp:currentDate
            },
          };

          myArr.push(messageSendObj);
          setChatMessage(() => {
            return [...myArr];
          });


        }
      }
    );

    scrollToBottom();
  }, [props.singleUserChatAllInfo, fetchingMessagesContext.singleConversationInitialMessage]);

  // **********************************************************

  // EVENT HANDLERS

  // 1. Sending Message To User Handler

  function userMessageHandler(val) {
    if (!val || val.trim() === "") return;

    const senderId = JSON.parse(
      window.atob(localStorage.getItem("Token")?.split(".")[1])
    ).UserId;


    const currentTime = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const currentDate = new Date().toLocaleDateString([], {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });

    let myArr = [...chatMessage];
    let messageSendObj = {
      groupId: props?.singleUserChatAllInfo?.groupId,
      clientMessageRedis: {
        userMessage: val,
        senderId: +senderId,
        receiverId: props.singleUserChatAllInfo.userId,
        messageSeen: false,
        messageTimeStamp:currentTime,
        messageDateStamp:currentDate
      },
    };

    myArr.push(messageSendObj);
    setChatMessage(() => {
      return myArr;
    });

    // send sender message to the server and storing it in redis and then from server calling this component function from there to store the sender data in message
    signalRConnectionSingletonObj
      .invoke("SendMessageToGroup", messageSendObj)
      .then(
        () => {
          // if the message request is sended correctly to the server side and
          const getDataFromSelectorId = document.getElementById(
            messageSendObj.groupId + "highlight-listMessage"
          );
          getDataFromSelectorId.textContent =
            messageSendObj.clientMessageRedis.userMessage; // highlight the message below the contact banner
        },
        (errors) => {
          console.log(errors);
        }
      );

    // storing or detecting that user group-name is connected or chatting with other user, for to store that groups name whenever that user leave the connection so,
    // then we can do some logic to send that groups to connected user and tell em that user is disconnected now.

    // let fetchingDataFromSate = userConnectedWithUserGroupsName;
    // let findingUserGroup = fetchingDataFromSate.indexOf(
    //   props.singleUserChatAllInfo.singleContactGroupConnectionId
    // );
    // if (findingUserGroup == -1) {
    //   setUserConnectedWithUserGroupName((prevData) => {
    //     return [
    //       ...prevData,
    //       props.singleUserChatAllInfo.singleContactGroupConnectionId,
    //     ];
    //   });
    // }

    // this below code should be here and not will be change-----------------------------.

    // this code will be only execute for to connect the add-contact user into user-chat-route
    // ******************* check out here about is user is connectedInMessage or not and if not then send request otherwise not ***************
    if (props.singleUserChatAllInfo.connectedInMessages == false) {
      props.mutateConnectedInMessageHandler(
        props.singleUserChatAllInfo.groupId
      );

      axios
        .get(
          "https://localhost:44389/api/Contact/MakeValidConnectedInMessageBetweenUser/" +
            props.singleUserChatAllInfo.groupId
        )
        .then(() => {});
    }
 
    scrollToBottom();
    // ---------------------------------------------------
  }

  const scrollToBottom = () => {

    setTimeout(()=>{
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    },100)
  };

  // **********************************************************

  // react-component-template-page-or-code-of-component
  return (
    <>
      <div
        className={` ${
          contextApiForChatSection.getShowChatSection == true
            ? ChatCss["complete-chat-read-section-show"]
            : "complete-chat-read-section-off"
        }`}
          >
        {/* profile section */}
        <MessageSenderProfile profile={props.singleUserChatAllInfo} />

        {/* chat read section */}
        <div className={ChatCss["chat-read-section"]}   >
          {chatMessage ? (
            chatMessage?.map((singleMessage, index) => {
              if (
                +JSON.parse(
                  window.atob(localStorage.getItem("Token")?.split(".")[1])
                ).UserId == singleMessage?.clientMessageRedis.senderId
              ) {
                return (
                  <>
                  <RightMessageSection
                    key={index}
                    singleMessage={singleMessage.clientMessageRedis}
                  />

                   <div ref={messagesEndRef}></div>

                  </>
                );
              }
              // you have sended message to the connected user
              if (
                +JSON.parse(
                  window.atob(localStorage.getItem("Token")?.split(".")[1])
                ).UserId != singleMessage?.clientMessageRedis.senderId
              ) {

                return (
                  <>
                  <LeftMessageSection
                    key={index}
                    singleMessage={singleMessage.clientMessageRedis}
                  />

                  <div ref={messagesEndRef}></div>

                  </>
                );
              }
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
export default React.memo(Chat);
