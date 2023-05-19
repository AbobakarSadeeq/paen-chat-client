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
import axios from "axios";

const Chat = (props) => {
  console.log(props);
  // context api's
  const contextApi = useContext(MessageContextApi);
  const contextApiForChatSection = useContext(LoggedInContext);
  // **********************************************************

  // states of chat components

  // 1. all pervious messages
  const [chatMessage, setChatMessage] = useState(() => {
    return []; // props.singleUserChatAllInfo.singleConnectedUserMessagesList
  });

  // 2. new messages added

  const [newMessagesAdded, setNewMessagesAdded] = useState(() => {
    return [];
  });

  // 3. groups name that single user connected with it

  const [userConnectedWithUserGroupsName, setUserConnectedWithUserGroupName] =
    useState(() => {
      return [];
    });

  // **********************************************************

  // refs varibles
  const messagesEndRef = useRef(null);

  // **********************************************************



  // use effects

  useEffect(() => {

      // if user sended message to the receiver then if condition will be true

    if (props.senderMessageData && props.senderMessageData.senderId !=
      JSON.parse(window.atob(localStorage.getItem("Token")?.split(".")[1])).UserId) {
      let selectedChatAllMessages = chatMessage;
      selectedChatAllMessages.push(props.senderMessageData);

      // this array is used for to show the real time message on the chat and also show the pervious message as well

      setChatMessage((pervsVal) => {
        return [...selectedChatAllMessages];
      });

      // it will give us advantage when user want to disccount him self then whose he/she connected chat then it will be remove the data from them that are already store in db.
      // group will be used for to find the connection

      // console.log(props.singleUserChatAllInfo.singleContactGroupConnectionId);
      let fetchingDataFromSate = userConnectedWithUserGroupsName;
      let findingUserGroup = fetchingDataFromSate.indexOf(props.singleUserChatAllInfo.singleContactGroupConnectionId);

      if (findingUserGroup == -1) {

        setUserConnectedWithUserGroupName((prevData) => {
          return [
            ...prevData,
            props.singleUserChatAllInfo.singleContactGroupConnectionId,
          ];
        });

      }

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

      setNewMessagesAdded(() => {
        return [...newMessagesAdded, storingMessageCustomizeObj];
      });

      // make custom array and do everything inside changes and fully apply update and apply the logic on it.
      mySignalRconnection.on(
        "RemoveDisconnectedUserDataFromArray",
        (disconnectedUserId) => {
          let updatingMessagesState = [...newMessagesAdded];
          if (
            updatingMessagesState.find(
              (a) =>
                a.senderId == disconnectedUserId ||
                a.reciverId == disconnectedUserId
            )
          ) {
            for (var index in updatingMessagesState) {
              if (
                updatingMessagesState[index].senderId == disconnectedUserId ||
                updatingMessagesState[index].reciverId == disconnectedUserId
              ) {
                updatingMessagesState.splice(index, 1);
              }
              if (updatingMessagesState.length - 1 == index) {
                setNewMessagesAdded(() => {
                  return [...updatingMessagesState];
                });
              }
            }

          }
        }
      );
    }

    // ************************************************

    // calling scrollToBottom method for execute when data is changed inside the component
    scrollToBottom();

    // whenever user send a message and the user want to go offline or closing browser then before closing browsing send data to db...
    // ClosingOrRefreshingChatSession();
  }, [props.senderMessageData]);

  // **********************************************************

  // EVENT HANDLERS

  // 1. Sending Message To User Handler

  function userMessageHandler(val) {

    let myArr = [...chatMessage];
    let messageSendObj = {
      groupId: props?.singleUserChatAllInfo?.singleContactGroupConnectionId,
      clientMessageRedis: {
        userMessage: val,
        senderId: props.singleUserChatAllInfo.userItSelfId,
        receiverId: props.singleUserChatAllInfo.usersConnectedId,
        message_Type: "text",
        messageSeen: true,
      },
    };
    contextApi.sendMessageFunc(messageSendObj);
    myArr.push(messageSendObj);
    setChatMessage((pervsVal) => {
      return myArr;
    });

    // send message to other user to see instant or in real time

    mySignalRconnection.invoke("SendMessageToGroup", messageSendObj).then(
      () => {
        // if the message request is sended correctly to the server side and also respsonse correct to the receiver then this block execute otherwise error block.
        scrollToBottom();
      },
      (errors) => {
        console.log(errors);
      }
    );
    // ******************* check out here about is user is connectedInMessage or not and if not then send request otherwise not ***************
      if(props.singleUserChatAllInfo.connectedInMessages == false) {
        props.mutateConnectedInMessageHandler(props.singleUserChatAllInfo.groupId);

        axios.get("https://localhost:44389/api/Contact/MakeValidConnectedInMessageBetweenUser/" + props.singleUserChatAllInfo.groupId).then(()=>{

        });

      }


    // storing new messages on both side inside the new message array for to store that messages inside database whenever single of em leave or connection is detect disconnected.

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

    // updating state of adding new message to state.
    setNewMessagesAdded(() => {
      return [...newMessagesAdded, sendMessageObj];
    });

    // storing or detecting that user group-name is connected or chatting with other user, for to store that groups name whenever that user leave the connection so,
    // then we can do some logic to send that groups to connected user and tell em that user is disconnected now.

    let fetchingDataFromSate = userConnectedWithUserGroupsName;
    let findingUserGroup = fetchingDataFromSate.indexOf(
      props.singleUserChatAllInfo.singleContactGroupConnectionId
    );
    if (findingUserGroup == -1) {
      setUserConnectedWithUserGroupName((prevData) => {
        return [
          ...prevData,
          props.singleUserChatAllInfo.singleContactGroupConnectionId,
        ];
      });
    }

    scrollToBottom();
  }

  // 2. Event execute when closing browser or tab happens on that user browser who's she/he closed it only

  // function ClosingOrRefreshingChatSession() {
  //   window.onbeforeunload = function (event) {
  //     if (newMessagesAdded.length > 0) {
  //       axios
  //         .post("https://localhost:44389/api/Message", newMessagesAdded)
  //         .then((response) => {
  //           console.log("data has been send to db.....");
  //         });

  //       mySignalRconnection
  //         .invoke(
  //           "UserTryingToDisconnecting",
  //           userConnectedWithUserGroupsName,
  //           JSON.parse(
  //             window.atob(localStorage.getItem("Token")?.split(".")[1])
  //           ).UserId
  //         )
  //         .then(() => {
  //           console.log(newMessagesAdded);
  //         });

  //       setNewMessagesAdded(() => {
  //         return [];
  //       });

  //       setUserConnectedWithUserGroupName(() => {
  //         return [];
  //       });
  //     }

  //     return "";
  //   };
  // }

  // 3. Scroll to bottom when message sended or received handler

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        <div className={ChatCss["chat-read-section"]} ref={messagesEndRef}>
          {chatMessage ? (
            chatMessage?.map((singleMessage, index) => {
              let customObj = {
                ...singleMessage,
              };

              delete customObj["senderUser"];
              delete customObj["reciverUser"];
              if (
                props.singleUserChatAllInfo.userItSelfId ==
                singleMessage?.senderId
              ) {
                // other user sended message to you

                return <RightMessageSection key={index} message={customObj} />;
              }
              // you have sended message to the connected user
              if (
                props.singleUserChatAllInfo.usersConnectedId ==
                singleMessage?.senderId
              ) {
                return <LeftMessageSection key={index} message={customObj} />;
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
export default Chat;

