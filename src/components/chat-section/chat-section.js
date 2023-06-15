import React, { memo, useCallback, useMemo } from "react";
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
import useFetchSingleGroupMessages from "../../hooks/fetch-single-group-messages";
import userChat from "../sidebar/user-chat/user-chat";

const Chat = (props) => {

  // context api's
  const fetchingMessagesContext = useContext(FetchingMessagesContext);
  const contextApiForChatSection = useContext(LoggedInContext);
  // **********************************************************

  // custom hooks

  const{singleGroupMessagesAsync} = useFetchSingleGroupMessages();

  // **********************************************************


  // states of chat components

  // 1. message to store here on both side sender as well as receiver
  const [chatMessage, setChatMessage] = useState(() => {
    return []; // props.singleUserChatAllInfo.singleConnectedUserMessagesList
  });

  // 3. groups name that single user connected with it

  const [userConnectedWithUserGroupsName, setUserConnectedWithUserGroupName] =useState(() => {
      return [];
  });

  const [userConversationSpecificDateIndex, setUserConversationSpecificDateIndex] = useState(()=>{
      return [];
  });

  const [checkUserChangeContactObject, setCheckUserChangeContactObject] = useState();

  const [conversationFetchingStoragesAllInfo, setConversationFetchingStoragesAllInfo] = useState(()=>{
    return {};
  });

  // **********************************************************

  // refs varibles
  const messagesEndRef = useRef(null);

  // **********************************************************



  useEffect(() => {
     // fetching the data from the sidbar single-chat-initiial value and this below code will execute the sidebar useEffect
     if(fetchingMessagesContext.selectedContactGroupForToFetchingItsMessage !== props?.singleUserChatAllInfo?.groupId) {
      fetchingMessagesContext.setSelectedContactGroupForToFetchingItsMessage(props?.singleUserChatAllInfo?.groupId);


      // here i have to send the data to another component and this will execute when component is removed from the dom.
      if(chatMessage.length > 0) {
        setChatMessage(() => {
          return [];
        });

        fetchingMessagesContext.setSingleConversationInitialMessage(()=>{
          return [];
        });
        // here i have to call or assign the data to the connectedContactsInitialMessages through execute the in side bar.
        const beforeConversationStartedMessageIndex = fetchingMessagesContext.singleConversationInitialMessage?.fetchedMessagesList?.length - 1;
        if(chatMessage.length > beforeConversationStartedMessageIndex + 1 ) {

          // here i have to call sidebar to change the specfic group all messages because it is updated.

        fetchingMessagesContext.setUpdateInitialMessagesOfSingleConversationGroupId(()=>{
          return fetchingMessagesContext.selectedContactGroupForToFetchingItsMessage;
        });



      }




      }
      return;
    }


    // NOTE!
    // THIS USEEFFECT WILL EXECUTE 4 TIME BECAUSE WHEN CHAT_SECTION COMPONENT OPENED THEN IT WILL SEND DATA TO THE SIDEBAR COMPONENT
    // THEN SIDEBAR WILL EXECUTE THE USEEFFECT AND WHEN THAT SIDEBAR EXECUTE IT WILL RE_RESEND THE DATA TO CHAT_SECTION FOR INITIAL_MESSAGE ARRAY
    // AND THEN CHAT_MESSAGE WILL UPDATE AND AGAIN WILL EXECUTE AND INITIALMESSAGE WILL REMOVE FROM THE ARRAY SO WHEN OPENING NEW
    // CHAT THEN DO SO OLD DATA IS NOT FOUND

    // empty the state because when ever message sended then update remove the other all message or add its the user those message which are stored in redis
    // here -----TASK----- whenever user make or change the contact then fetch the data from the redis here first.


    else {
    if(fetchingMessagesContext?.singleConversationInitialMessage?.fetchedMessagesList?.length > 0 && chatMessage.length === 0) {

      // when change storage
            // reset lastCOunt
            // reset scroll to zero
            // if lastCOunt 30 and storage not change then change scroll only and lastCOunt to 0 again
      if(fetchingMessagesContext.singleConversationInitialMessage.fetchingMessagesStorageNo !== 1 && fetchingMessagesContext.singleConversationInitialMessage.lastMessagesCount !== 30) {
      setConversationFetchingStoragesAllInfo(()=>{
        return {
          fetchingMessagesStorageNo: fetchingMessagesContext.singleConversationInitialMessage.fetchingMessagesStorageNo,
          lastMessagesCount: 0,
          groupId: fetchingMessagesContext.singleConversationInitialMessage.groupId,
          currentScrollingPosition: 1
        }
      });

       }
     else {
      // storing all info about which storage the data came from
          setConversationFetchingStoragesAllInfo(()=>{
            return {
              fetchingMessagesStorageNo:  fetchingMessagesContext.singleConversationInitialMessage.fetchingMessagesStorageNo,
              lastMessagesCount: fetchingMessagesContext.singleConversationInitialMessage.lastMessagesCount,
              groupId: fetchingMessagesContext.singleConversationInitialMessage.groupId,
              currentScrollingPosition:fetchingMessagesContext?.singleConversationInitialMessage?.fetchedMessagesList.length === 30 ? 2 : 1
            }
          });
        }





      // reversing the array for to show the initial message correct way and assigning to the list.

      reversingFetchedMessageDataForToShowCorrectWayAndAssigningTheUniqueDatesToState(fetchingMessagesContext.singleConversationInitialMessage.fetchedMessagesList);


      // if(fetchingMessagesContext?.singleConversationInitialMessage?.fetchedMessagesList?.length > 0) {

      //   fetchingMessagesContext.setSingleConversationInitialMessage(()=>{
      //     return [];
      //   });
      // }

    }

  }



    scrollToBottom();
  }, [props.singleUserChatAllInfo, chatMessage, fetchingMessagesContext.singleConversationInitialMessage]);

  // **********************************************************

  // this useEffect will be execute when chatMessages changes happen and index added means it which date index and also execute when component execute first time
  useEffect(()=>{
    const loggedInUserId = +JSON.parse(
      window.atob(localStorage.getItem("Token")?.split(".")[1])
    ).UserId;

    let prevsAllMessages = [...chatMessage];
    let prevsAllMessagesIndex = [...userConversationSpecificDateIndex];
    signalRConnectionSingletonObj.on("ReceiveingSenderMessageFromConnectedContactUser",(receivingSenderData) => {
      if (loggedInUserId === receivingSenderData.clientMessageRedis.receiverId) {
        const getDataFromSelectorId = document.getElementById(receivingSenderData.groupId + "highlight-listMessage");
        getDataFromSelectorId.textContent = receivingSenderData.clientMessageRedis.userMessage;


          let messageSendObj = {
            groupId: receivingSenderData.groupId,
            clientMessageRedis: {
              userMessage: receivingSenderData.clientMessageRedis.userMessage,
              senderId: receivingSenderData.clientMessageRedis.senderId,
              receiverId: loggedInUserId,
              messageSeen: false,
              messageTimeStamp:receivingSenderData.clientMessageRedis.messageTimeStamp,
              messageDateStamp:receivingSenderData.clientMessageRedis.messageDateStamp
            },
          };



          let findingIndex = prevsAllMessages.length - 1 == -1 ? 0: prevsAllMessages.length - 1;
          const findingLastMessageDate = prevsAllMessages[findingIndex]?.clientMessageRedis?.messageDateStamp;


          prevsAllMessages.push(messageSendObj);
          setChatMessage(() => {
            return [...prevsAllMessages];
          });


          if(findingLastMessageDate == receivingSenderData.clientMessageRedis.messageDateStamp) {

            setUserConversationSpecificDateIndex(()=>{
              return [...prevsAllMessagesIndex, -1];
            });
          }

          else {
              setUserConversationSpecificDateIndex(()=>{
                return [...prevsAllMessagesIndex, (findingIndex + 1)];
              });
          }

        }
      }
    );



  },[chatMessage, userConversationSpecificDateIndex])


  // Custom function

  // receiver-message handler this will be called



  function reversingFetchedMessageDataForToShowCorrectWayAndAssigningTheUniqueDatesToState(fetchedArr) {

      if(fetchedArr === [])
        return;

      let uniqueAllDatesForToShowMessagesSendedDatesIndex = [];
      let customizingArr = [];
      let lastDate = "";
      let newDateIndex = 0;
      if(fetchingMessagesContext.updateInitialMessagesOfSingleConversationGroupId?.length > 0)
         fetchedArr.reverse(); // reverse done

      for(const singleMessage of fetchedArr) {
        if(newDateIndex == 0) {
          uniqueAllDatesForToShowMessagesSendedDatesIndex.push(0);
          lastDate = singleMessage.messageDateStamp;
        }else {
        if(singleMessage.messageDateStamp !== lastDate) {
          uniqueAllDatesForToShowMessagesSendedDatesIndex.push(-1);
          uniqueAllDatesForToShowMessagesSendedDatesIndex.push(newDateIndex);
          lastDate = singleMessage.messageDateStamp;

        }else {
          uniqueAllDatesForToShowMessagesSendedDatesIndex.push(-1);
        }
      }



        customizingArr.push({
          groupId:props?.singleUserChatAllInfo?.groupId,
          clientMessageRedis: singleMessage
        })

        newDateIndex = newDateIndex + 1;

      }


      setChatMessage(()=>{
        return [...customizingArr];
      });

      setUserConversationSpecificDateIndex(()=>{
        return [...uniqueAllDatesForToShowMessagesSendedDatesIndex, -1];
      })
  }


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


    const todayDate = new Date();
    const currentDate = `${todayDate.getDate()}/${todayDate.getMonth()+1}/${todayDate.getFullYear()}`;


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

    // here to add the unique index for date as well.
    // firstly find the date here

    let findingIndex = chatMessage.length - 1 == -1 ? 0: chatMessage.length - 1;
    const findingLastMessageDate = chatMessage[findingIndex]?.clientMessageRedis?.messageDateStamp;
    if(findingLastMessageDate == currentDate) {
      setUserConversationSpecificDateIndex((prevs)=>{
        return [...prevs, -1];
      })




    }else {

      // new day and new date


        setUserConversationSpecificDateIndex((prevs)=>{
          return [...prevs, (findingIndex + 1)];
        })
    }

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

  // expend and show more message which is stored in database
  function expendAndShowMoreConversationMessages() {
    let sendInfoForToFetchMoreMessages = {
    currentScrollingPosition: conversationFetchingStoragesAllInfo.currentScrollingPosition,
    fetchingMessagesStorageNo: conversationFetchingStoragesAllInfo.fetchingMessagesStorageNo,
    groupId: conversationFetchingStoragesAllInfo.groupId,
    user1: +(JSON.parse(window.atob(localStorage.getItem("Token")?.split(".")[1])).UserId),
    user2: props.singleUserChatAllInfo.userId,
    lastMessagesCount: conversationFetchingStoragesAllInfo.lastMessagesCount
    }

    singleGroupMessagesAsync(sendInfoForToFetchMoreMessages).then((response)=>{
      debugger;
      if(response.data.fetchedMessagesList.length === 30) {
        sendInfoForToFetchMoreMessages.currentScrollingPosition = sendInfoForToFetchMoreMessages.currentScrollingPosition + 1;
        sendInfoForToFetchMoreMessages.lastMessagesCount = 0;
      } else {
        if(sendInfoForToFetchMoreMessages.fetchingMessagesStorageNo !== response.data.fetchingMessagesStorageNo && response.data.fetchingMessagesStorageNo !== -1  && response
          .data.lastMessagesCount !== 30) {
            sendInfoForToFetchMoreMessages.fetchingMessagesStorageNo = response.data.fetchingMessagesStorageNo;
            sendInfoForToFetchMoreMessages.lastMessagesCount = 0;
            sendInfoForToFetchMoreMessages.currentScrollingPosition = 1;

          }else {
            sendInfoForToFetchMoreMessages.fetchingMessagesStorageNo = response.data.fetchingMessagesStorageNo;
            sendInfoForToFetchMoreMessages.lastMessagesCount = response.data.lastMessagesCount;

          }
      }

      // no data found on every database
      if(response.data.fetchingMessagesStorageNo === -1 && response.data.lastMessagesCount > 0) {
        sendInfoForToFetchMoreMessages.fetchingMessagesStorageNo = -1;
        sendInfoForToFetchMoreMessages.lastMessagesCount = 0;
        setConversationFetchingStoragesAllInfo(()=>{
          return sendInfoForToFetchMoreMessages;
        });

      }else if(response.data.fetchingMessagesStorageNo === -1 && response.data.lastMessagesCount === 0) {
        sendInfoForToFetchMoreMessages.fetchingMessagesStorageNo = -1;
        sendInfoForToFetchMoreMessages.lastMessagesCount = 0;
        setConversationFetchingStoragesAllInfo(()=>{
          return sendInfoForToFetchMoreMessages;
        });

        return;
      }


      setConversationFetchingStoragesAllInfo(()=>{
        return sendInfoForToFetchMoreMessages;
      });

      // assingine the fetching message to the message array
      let uniqueAllDatesForToShowMessagesSendedDatesIndex = [];
      let customizingArr = [];
      let lastDate = "";
      let newDateIndex = 0;
      response.data.fetchedMessagesList.reverse(); // reverse done
      for(const singleMessage of response.data.fetchedMessagesList) {
        if(newDateIndex == 0) {
          uniqueAllDatesForToShowMessagesSendedDatesIndex.push(0);
          lastDate = singleMessage.messageDateStamp;
        }else {
        if(singleMessage.messageDateStamp !== lastDate) {
          uniqueAllDatesForToShowMessagesSendedDatesIndex.push(-1);
          uniqueAllDatesForToShowMessagesSendedDatesIndex.push(newDateIndex);
          lastDate = singleMessage.messageDateStamp;

        }else {
          uniqueAllDatesForToShowMessagesSendedDatesIndex.push(-1);
        }
      }



        customizingArr.push({
          groupId:props?.singleUserChatAllInfo?.groupId,
          clientMessageRedis: singleMessage
        })

        newDateIndex = newDateIndex + 1;

      }


      let updatingIndexArr = [...userConversationSpecificDateIndex];
      if(chatMessage[0].clientMessageRedis.messageDateStamp === customizingArr[0].clientMessageRedis.messageDateStamp) {
        updatingIndexArr[0] = -1;
        updatingIndexArr = [...uniqueAllDatesForToShowMessagesSendedDatesIndex, ...updatingIndexArr];
      }else {
        updatingIndexArr = [...uniqueAllDatesForToShowMessagesSendedDatesIndex, ...updatingIndexArr];
      }

      setChatMessage((prevs)=>{
        return [...customizingArr, ...prevs];
      });

      setUserConversationSpecificDateIndex((prevs)=>{
        return [...updatingIndexArr];
      })

    });

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


        {conversationFetchingStoragesAllInfo.fetchingMessagesStorageNo !== -1
         && chatMessage.length !== 0 ? <button className={ChatCss["show-more-messages"]} onClick={expendAndShowMoreConversationMessages}>More Messages</button> : null}


          {chatMessage ? (
            chatMessage?.map((singleMessage, index) => {
              if (+JSON.parse(window.atob(localStorage.getItem("Token")?.split(".")[1])).UserId == singleMessage?.clientMessageRedis.senderId) {

                if(index === 0 && userConnectedWithUserGroupsName[0] !== -1) {
                  return (
                      <div key={index}>
                      <p className={ChatCss["chat-conversation-unique-dates"]}>{singleMessage.clientMessageRedis.messageDateStamp}</p>
                      <RightMessageSection singleMessage={singleMessage.clientMessageRedis} />
                      <div ref={messagesEndRef}></div>
                      </div>
                    );
                }

                if(userConversationSpecificDateIndex[index] !== -1)
                   return (
                      <div key={index}>
                      <p className={ChatCss["chat-conversation-unique-dates"]}>{singleMessage.clientMessageRedis.messageDateStamp}</p>
                      <RightMessageSection singleMessage={singleMessage.clientMessageRedis} />
                      <div ref={messagesEndRef}></div>
                      </div>
                    );

                else

                  return (
                    <div key={index}>
                    <RightMessageSection singleMessage={singleMessage.clientMessageRedis}/>
                    <div ref={messagesEndRef}></div>
                    </div>
                  );


              }
              // you have sended message to the connected user
              if (+JSON.parse(window.atob(localStorage.getItem("Token")?.split(".")[1])).UserId != singleMessage?.clientMessageRedis.senderId) {

                if(index === 0 && userConnectedWithUserGroupsName[0] !== -1) {
                  return (
                      <div key={index}>
                      <p className={ChatCss["chat-conversation-unique-dates"]}>{singleMessage.clientMessageRedis.messageDateStamp}</p>
                      <LeftMessageSection singleMessage={singleMessage.clientMessageRedis} />
                      <div ref={messagesEndRef}></div>
                      </div>
                    );
                }

                if(userConversationSpecificDateIndex[index] !== -1)

                   return (
                      <div key={index}>
                      <p className={ChatCss["chat-conversation-unique-dates"]}>{singleMessage.clientMessageRedis.messageDateStamp}</p>
                      <LeftMessageSection singleMessage={singleMessage.clientMessageRedis} />
                      <div ref={messagesEndRef}></div>
                      </div>
                    );

                    else
                return (
                  <div key={index}>
                  <LeftMessageSection singleMessage={singleMessage.clientMessageRedis}/>
                  <div ref={messagesEndRef}></div>
                  </div>
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


