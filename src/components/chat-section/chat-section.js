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
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRef } from "react";
import axios from "axios";
import { signalRConnectionSingletonObj } from "../Auth/auth";
import FetchingMessagesContext from "../../context/fetching-message-context/fetching-message-context";
import useFetchSingleGroupMessages from "../../hooks/fetch-single-group-messages";
import userChat from "../sidebar/user-chat/user-chat";
import ContactContext from "../../context/contact-context/contact-context";

const ChatSection = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const contextContactApi = useContext(ContactContext);


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

  const [selectedPageGroupIdFromQueryString, setSelectedPageGroupIdFromQueryString] = useState(()=>{
    return "";
  })

  const [selectedContactGroupId, setSelectedContactGroupId] = useState(()=>{
    return props?.singleUserChatAllInfo?.groupId;
  })

  const [isRecievedCodeExecutedOneTime, setIsRecievedCodeExecutedOneTime] = useState(()=>{
    return false;
  })

  // **********************************************************

  // refs varibles
  const messagesEndRef = useRef(null);
  const selectedGroupId = useRef(props.singleUserChatAllInfo.groupId);

  // **********************************************************

  // custom hooks


  useEffect(()=>{
    const loggedInId = +(JSON.parse(window.atob(localStorage.getItem("Token")?.split(".")[1])).UserId);
    const fetchingMessagesByFilteringInitialPoint = {
      currentScrollingPosition: 1,
      fetchingMessagesStorageNo: 1,
      groupId: props.singleUserChatAllInfo.groupId,
      user1: props.singleUserChatAllInfo.userId,
      user2: loggedInId,
      lastMessagesCount: 0,
      unReadMessages: props?.singleUserChatAllInfo?.countUnSeenMessages
    };

    // when chat is changed then empty or make the chat empty first
    if(props.singleUserChatAllInfo) {
    console.log(props.singleUserChatAllInfo);

      if(chatMessage.length > 0) {
        setChatMessage(()=>{
          return [];
        });
      }

      setSelectedContactGroupId(()=>{
        return props?.singleUserChatAllInfo?.groupId;
      })

      selectedGroupId.current = props?.singleUserChatAllInfo?.groupId;

      // this below code will execute each time when contact is changed

      singleGroupMessagesAsync(fetchingMessagesByFilteringInitialPoint).then((responseData)=>{
        responseData.data.fetchedMessagesList.reverse();
        let chatMessagess = [];
        let findingLastMessageDate = "";

        for(let singleMessage of responseData.data.fetchedMessagesList) {
          chatMessagess.push({
              clientMessageRedis: singleMessage,
              groupId:fetchingMessagesByFilteringInitialPoint.groupId
            });


            if(findingLastMessageDate == singleMessage.messageDateStamp) {

              setUserConversationSpecificDateIndex((prevsAllIndex)=>{
                return [...prevsAllIndex, -1];
              });

            }

            else {
                setUserConversationSpecificDateIndex((prevsAllIndex)=>{
                  return [...prevsAllIndex, 1]; // new value added
                });

              findingLastMessageDate = singleMessage.messageDateStamp;

            }



        }
        setChatMessage(()=>{
          return [...chatMessagess];
        });

        let sendInfoForToFetchMoreMessages = {
          currentScrollingPosition: responseData.data.fetchedMessagesList?.length === 30 ? 2 : 1,
          fetchingMessagesStorageNo: responseData.data.fetchingMessagesStorageNo,
          groupId: fetchingMessagesByFilteringInitialPoint.groupId,
          user1: fetchingMessagesByFilteringInitialPoint.user1,
          user2: loggedInId,
          lastMessagesCount: responseData.data.lastMessagesCount
          }



        setConversationFetchingStoragesAllInfo(()=>{
          return sendInfoForToFetchMoreMessages;
        });
      });

      console.log(props);

      if(props.singleUserChatAllInfo?.countUnSeenMessages > 0) {
        const getDataFromSelectorId = document.getElementById(fetchingMessagesByFilteringInitialPoint.groupId + "highlight-listMessage");
        getDataFromSelectorId.style.color = "#8a98ac";
        props.notificationFromContactArrayIndexOfNewMessageOfOtherUserEvenReceiverIsOnline(fetchingMessagesByFilteringInitialPoint.groupId + " DEL");
        // DEl means readed all messages so remove the notification and last message color as well,.
       setTimeout(()=>{
        props.notificationFromContactArrayIndexOfNewMessageOfOtherUserEvenReceiverIsOnline("");
       },1500)

       // here call the backend here about messages has been seeen....
       // group Id and sended userId passed who's sended the messages and to that user only update the messages list array
       let senderId = fetchingMessagesByFilteringInitialPoint.user1;
       signalRConnectionSingletonObj.invoke("TickReadedForSenderOfAllSendedMessages", props.singleUserChatAllInfo.groupId, senderId).then(()=>{

       });



      }




    }


    // this below code will be execute only one time when chat is opened and this code is receiving code
    if(isRecievedCodeExecutedOneTime === false) {

      signalRConnectionSingletonObj.on("ReceiveingSenderMessageFromConnectedContactUser", (receivingSenderData) => {

        if (loggedInId === receivingSenderData.clientMessageRedis.receiverId) {
          // this ReceiveingSenderMessageFromConnectedContactUser two times

          let messageSendObj = {
            groupId: receivingSenderData.groupId,
            clientMessageRedis: {
              userMessage: receivingSenderData.clientMessageRedis.userMessage,
              senderId: receivingSenderData.clientMessageRedis.senderId,
              receiverId: loggedInId,
              messageSeen: 0,
              messageTimeStamp:receivingSenderData.clientMessageRedis.messageTimeStamp,
              messageDateStamp:receivingSenderData.clientMessageRedis.messageDateStamp
            },
          };

          // selectedContactGroupId this state is not updating when i sended a message
          if(selectedGroupId.current === receivingSenderData.groupId) { // both user on the same page
            messageSendObj.clientMessageRedis.messageSeen = 2; // saw the message
          }else if(selectedGroupId.current !== receivingSenderData.groupId) {
            messageSendObj.clientMessageRedis.messageSeen = 1; // saw the message
            props.notificationFromContactArrayIndexOfNewMessageOfOtherUserEvenReceiverIsOnline(receivingSenderData.groupId);
            setTimeout(()=>{
            props.notificationFromContactArrayIndexOfNewMessageOfOtherUserEvenReceiverIsOnline("");

            },1500)
          } // by default it will be zero because if this not execute then store data directly on db and assign 0


          const getDataFromSelectorId = document.getElementById(receivingSenderData.groupId + "highlight-listMessage");
          if(receivingSenderData.clientMessageRedis.userMessage?.length > 28) {
            getDataFromSelectorId.textContent = receivingSenderData.clientMessageRedis
            ?.userMessage?.substring(0, 25) + "....";
            if(messageSendObj.clientMessageRedis.messageSeen === 2)
                getDataFromSelectorId.style.color = "#8a98ac";
            else if(messageSendObj.clientMessageRedis.messageSeen === 1)
               getDataFromSelectorId.style.color = "#19a299";


          }else {
            getDataFromSelectorId.textContent = receivingSenderData.clientMessageRedis.userMessage;
            if(messageSendObj.clientMessageRedis.messageSeen === 2)
            getDataFromSelectorId.style.color = "#8a98ac";
        else if(messageSendObj.clientMessageRedis.messageSeen === 1)
           getDataFromSelectorId.style.color = "#19a299";
          }

            // storing the data inside the redis if user become online
            signalRConnectionSingletonObj.invoke("StoreMessageOnRedis", messageSendObj).then(()=>{

            });

          if(selectedGroupId.current === receivingSenderData.groupId) {

              let findingLastMessageDate = "";

              setChatMessage((prevChatMessage) => {
                  const updatedChatMessage = [...prevChatMessage, messageSendObj];
                  findingLastMessageDate = prevChatMessage[prevChatMessage.length - 1]?.clientMessageRedis?.messageDateStamp;
                  return updatedChatMessage;
              });

              if(findingLastMessageDate == receivingSenderData.clientMessageRedis.messageDateStamp) {

                setUserConversationSpecificDateIndex((prevsAllIndex)=>{
                  return [...prevsAllIndex, -1];
                });
              }

              else {
                  setUserConversationSpecificDateIndex((prevsAllIndex)=>{
                    return [...prevsAllIndex, 1]; // new value added
                  });
              }
            }
          }

          }
      );



    // messageSeenUpdated callback from server side

    signalRConnectionSingletonObj.on("SendedMessageSeenUpdated", (messageSendObj)=>{
        if(messageSendObj.clientMessageRedis.senderId === loggedInId) {

          setChatMessage((prevsChatMessages)=>{
            const updatedChatMessage = [...prevsChatMessages];
            updatedChatMessage[updatedChatMessage.length-1].clientMessageRedis.messageSeen = messageSendObj.clientMessageRedis.messageSeen;
            return updatedChatMessage;
          });

        }
    })

    setIsRecievedCodeExecutedOneTime(()=>{
      return true;
    });


    // here will be receive the data from callback backend for to remove

    signalRConnectionSingletonObj.on("MakeItReadedAllUnReadMessagesFromSenderSide", (senderId)=>{

      if( loggedInId === senderId) {
        // update message

        setChatMessage((prevs)=>{
          for(var lastIndexStart = prevs.length -1; lastIndexStart>0; lastIndexStart--) {
            if(prevs[lastIndexStart].clientMessageRedis.messageSeen === 2)
              break;

              // 2 means messages saw it

          prevs[lastIndexStart].clientMessageRedis.messageSeen = 2;

          }

          return [...prevs]

        });


      }


    });

  }


    scrollToBottom();
  }, [props.singleUserChatAllInfo])





  // **********************************************************

  // this useEffect will be execute when chatMessages changes happen and index added means it which date index and also execute when component execute first time



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
        return [...uniqueAllDatesForToShowMessagesSendedDatesIndex];
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
        messageSeen: 0, // by default user is in home page and if it is
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
          if(messageSendObj.clientMessageRedis.userMessage?.length > 28) {
            getDataFromSelectorId.textContent =  messageSendObj.clientMessageRedis.userMessage
            ?.substring(0, 25) + "....";

          }else {
            getDataFromSelectorId.textContent =  messageSendObj.clientMessageRedis.userMessage;
          }

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


      if(conversationFetchingStoragesAllInfo.fetchingMessagesStorageNo === 3 ||
        (response.data.fetchingMessagesStorageNo === -1 && response.data.lastMessagesCount > 0)) {
          const date = new Date(singleMessage.messageDateStamp);
          const formattedDate = date.toLocaleDateString("en-US", {day:"numeric", month:"numeric",year:"numeric"});
          const splitingDate = formattedDate.split("/");
          singleMessage.messageDateStamp = splitingDate[1] + "/" + splitingDate[0] + "/" + splitingDate[2];

          const [hours, minutes] = singleMessage.messageTimeStamp.split(":");
          date.setHours(hours);
          date.setMinutes(minutes);
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute:"numeric",
            hour12: true,
          });
          singleMessage.messageTimeStamp = formattedTime;

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
export default React.memo(ChatSection);


