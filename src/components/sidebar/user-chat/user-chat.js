import React, { memo } from "react";
import UserChatCss from "./user-chat.module.css";
import NoUserImg from "../../../assest/No Image.jpg";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useContext } from "react";
import LoggedInContext from "../../../context/loggedIn/loggedIn";
import { signalRConnectionSingletonObj } from "../../Auth/auth";

// this component will be only show the user that will be shown in chat-route users that are valid and also show the user connected with the specefic component.
const UserChat = memo((props) => {
  debugger;
  const location = useLocation();
  const contextApi = useContext(LoggedInContext);

  let renderingSingleContact = null;

  if (props.AddContactData.connectedInMessages && location.pathname == "/Chats") {
    renderingSingleContact = (
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
                {/* whose sender and reciver both id is equal to array and connectedAddContactData are same */}
                {location.pathname == "/Chats"
                  ? props?.messageSendFromUser?.userMessage?.length > 28
                    ? // sended message to user will be show below their profile and also reciver can also see that message at bottom of the profile as well and also here if string chars is greater then 28 then it will be shown only in dots else it wont in else state
                      props?.messageSendFromUser?.senderId ==
                        props?.AddContactData?.usersConnectedId ||
                      props?.AddContactData?.usersConnectedId ==
                        props?.messageSendFromUser?.reciverId
                      ? props?.messageSendFromUser?.userMessage?.substring(
                          0,
                          25
                        ) + "...." // sended message to user will be show below their profile and also reciver can also see that message at bottom of the profile as well
                      : "last messsage will shown here"
                    : props?.messageSendFromUser?.senderId ==
                        props?.AddContactData?.usersConnectedId ||
                      props?.AddContactData?.usersConnectedId ==
                        props?.messageSendFromUser?.reciverId
                    ? props?.messageSendFromUser?.userMessage
                    : "" // last messsage will shown here and also apply the condition as well because it show one last message on all connectedContact
                  : // contact page data
                  props?.AddContactData?.aboutStatus?.length > 28 // if length is greater then 28 show below 173 line code else show 174 code
                  ? props?.AddContactData?.aboutStatus?.substring(0, 25) +
                    "...."
                  : props?.AddContactData?.contactName}
              </p>
            </div>

            <div className={UserChatCss["date-connection-on"]}>
              <span></span>
            </div>
          </div>
        </div>
    );
  } else if (location.pathname == "/AddContact") {
    renderingSingleContact = (
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
                {/* whose sender and reciver both id is equal to array and connectedAddContactData are same */}
                {location.pathname == "/Chats"
                  ? props?.messageSendFromUser?.userMessage?.length > 28
                    ? // sended message to user will be show below their profile and also reciver can also see that message at bottom of the profile as well and also here if string chars is greater then 28 then it will be shown only in dots else it wont in else state
                      props?.messageSendFromUser?.senderId ==
                        props?.AddContactData?.usersConnectedId ||
                      props?.AddContactData?.usersConnectedId ==
                        props?.messageSendFromUser?.reciverId
                      ? props?.messageSendFromUser?.userMessage?.substring(
                          0,
                          25
                        ) + "...." // sended message to user will be show below their profile and also reciver can also see that message at bottom of the profile as well
                      : "last messsage will shown here"
                    : props?.messageSendFromUser?.senderId ==
                        props?.AddContactData?.usersConnectedId ||
                      props?.AddContactData?.usersConnectedId ==
                        props?.messageSendFromUser?.reciverId
                    ? props?.messageSendFromUser?.userMessage
                    : "" // last messsage will shown here and also apply the condition as well because it show one last message on all connectedContact
                  : // contact page data
                  props?.AddContactData?.aboutStatus?.length > 28 // if length is greater then 28 show below 173 line code else show 174 code
                  ? props?.AddContactData?.aboutStatus?.substring(0, 25) +
                    "...."
                  : props?.AddContactData?.contactName}
              </p>
            </div>

            <div className={UserChatCss["date-connection-on"]}>
              <span></span>
            </div>
          </div>
        </div>
    );
  }

  function onClickContact() {
    if (location.pathname == "/Chats" && props.AddContactData) {
      // this block is only execute when user-specific chat section open in chats route like click on the chat
      props.changeSelectedContactEffect(props.index);
      props.showChatSection();
      props.selectedChatUperProfileData(props.AddContactData);
      contextApi.messageSectionOpenend(false);
      contextApi.showChatSectionThroughUserDetailProfileSection(
        props.AddContactData
      );
      contextApi.showContactDetailHandler("chat");
      contextApi.showChatSectionAssign(true); // turn it On.
      contextApi.setShowSideBarSection(false);
    } else if (props.AddContactData && location.pathname == "/AddContact") {
      // this block is execute when contact-detail page is opened through add-contact route

      props.showAddContactPanel(props.AddContactData);
      props.changeSelectedContactEffect(props.index);
      props.showChatSection();
      contextApi.messageSectionOpenend(false);
      contextApi.showChatSectionThroughUserDetailProfileSection(
        props.AddContactData
      );
      contextApi.showContactDetailHandler("AddContact");
    }
  }

  useEffect(() => {

    // nulls will help here to connect the users within their's group and if it become not null or having the data then it means single user are connected with their contacts that are releated
    // if i connect with the signalR group separetly like connect first chat-section all user and then add-contact all user
    if (props.sendMessageToServer == null) {
      // this block will be execute only once when user logged in
      signalRConnectionSingletonObj.invoke("ConnectingSingleUserOfSingleContactWithTheirUniqueGroupIdForRealTimeMessaging", props?.AddContactData?.groupId,
          JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1])).UserId).then(() => {}, (errors) => {});

      // who's logged in the user and its valid contact connected here... and this will be called from the server side this below method
      // for now below code is not required for me to do things;

      // signalRConnectionSingletonObj.on("UserSingleContactIsConnectedWithTheirsGroup", (userId, groupName) => {
      //   console.log(userId + " is joined the group and group name is: " + groupName);
      // });
    }
  }, []);

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
    // here changes
    <>{renderingSingleContact}</>
  );
});

export default UserChat;
