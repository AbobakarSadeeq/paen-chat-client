import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import sidebarCss from "./sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowRightFromBracket,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import UserChat from "./user-chat/user-chat";
import Menu from "./menu/menu";
import AddContact from "./add-contact/add-contact";
import axios from "axios";
import LoggedInContext from "../../context/loggedIn/loggedIn";
import { useLocation, useNavigate } from "react-router";
import UserEditProfile from "./user-edit-profile/user-edit-profile";
import { useRef } from "react";
import useFetchSingleGroupMessages from "../../hooks/fetch-single-group-messages";
import FetchingMessagesContext from "../../context/fetching-message-context/fetching-message-context";
import { signalRConnectionSingletonObj } from "../Auth/auth";
import ContactContext from "../../context/contact-context/contact-context";

const Sidebar = (props) => {
  console.log(props);
  const location = useLocation();
  const navigate = useNavigate();
  const { singleGroupMessagesAsync } = useFetchSingleGroupMessages();
  const loggedInContextApi = useContext(LoggedInContext);
  const fetchingMessagesContext = useContext(FetchingMessagesContext);
  const contextContactApi = useContext(ContactContext);


  const [menuSelectedVal, setMenuSelectedVal] = useState(() => {
    return "Chats";
  });

  const [connectedContactList, setConnectedContactList] = useState(() => {
    return [];
  });

  const [selectedIndex, setSelectedIndex] = useState(() => {
    return 0;
  });

  const [connectedContactsInitialMessages, setConnectedContactsInitialMessages] = useState(()=>{
    return [];
  })

  const [addContactSectionContactList, setAddContactSectionContactList] =
    useState(() => {
      return [];
    });

    console.log(connectedContactList);

  useEffect(() => {
        // NOTE!
    // THIS USEEFFECT WILL EXECUTE TWO TIME BECAUSE WHEN CHAT_SECTION COMPONENT OPENED THEN IT WILL SEND DATA TO THE SIDEBAR COMPONENT
    // THEN SIDEBAR WILL EXECUTE THE USEEFFECT AND WHEN THAT SIDEBAR EXECUTE IT WILL RE_RESEND THE DATA TO CHAT_SECTION FOR INITIAL_MESSAGE ARRAY
    // this code will execute the chat-section side bar
    // if(fetchingMessagesContext.updateInitialMessagesOfSingleConversationGroupId?.length > 0 &&
    //   fetchingMessagesContext.updateInitialMessagesOfSingleConversationGroupId !== fetchingMessagesContext.selectedContactGroupForToFetchingItsMessage) {
    //   const findingInitialMessagesByGroupIdFromInitialMessageListIndex = connectedContactsInitialMessages
    //   .findIndex(a=>a.groupId === fetchingMessagesContext.updateInitialMessagesOfSingleConversationGroupId);

    //   const findingUserId = connectedContactsInitialMessages[findingInitialMessagesByGroupIdFromInitialMessageListIndex]?.fetchedMessagesList[0];

    //   const loggedInId = +(JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1])).UserId);
    //   const fetchingMessagesByFilteringInitialPoint = {
    //     currentScrollingPosition: 1,
    //     fetchingMessagesStorageNo: 1,
    //     groupId: fetchingMessagesContext.updateInitialMessagesOfSingleConversationGroupId,
    //     user1: findingUserId.senderId == loggedInId ? findingUserId.receiverId  : findingUserId.senderId,
    //     user2: loggedInId,
    //     lastMessagesCount: 0,
    //   };

    //   singleGroupMessagesAsync(fetchingMessagesByFilteringInitialPoint).then((responseData)=>{
    //     const updatingConnectedContactsInitialMessages = [...connectedContactsInitialMessages];
    //     updatingConnectedContactsInitialMessages[findingInitialMessagesByGroupIdFromInitialMessageListIndex].fetchedMessagesList = responseData.data.fetchedMessagesList;
    //     setConnectedContactsInitialMessages(()=>{
    //     return [...updatingConnectedContactsInitialMessages];
    //     });

    //   })



    //   // updating the initial messages of the array



    //   return;
    // }


    // SEPEARTE THING BELOW HERE.

    // if(fetchingMessagesContext.selectedContactGroupForToFetchingItsMessage.length > 1) {
    //   const findingInitialMessagesByGroupIdFromInitialMessageListIndex = connectedContactsInitialMessages
    //   .findIndex(a=>a.groupId === fetchingMessagesContext.selectedContactGroupForToFetchingItsMessage);

    //   for(var singleMessage of connectedContactsInitialMessages[findingInitialMessagesByGroupIdFromInitialMessageListIndex].fetchedMessagesList) {
    //     if(connectedContactsInitialMessages[findingInitialMessagesByGroupIdFromInitialMessageListIndex].fetchingMessagesStorageNo === 3 ||
    //       (connectedContactsInitialMessages[findingInitialMessagesByGroupIdFromInitialMessageListIndex].fetchingMessagesStorageNo === -1 &&
    //          connectedContactsInitialMessages[findingInitialMessagesByGroupIdFromInitialMessageListIndex].lastMessagesCount > 0)) {
    //         const date = new Date(singleMessage.messageDateStamp);
    //         const formattedDate = date.toLocaleDateString("en-US", {day:"numeric", month:"numeric",year:"numeric"});
    //         const splitingDate = formattedDate.split("/");
    //         singleMessage.messageDateStamp = splitingDate[1] + "/" + splitingDate[0] + "/" + splitingDate[2];

    //         const [hours, minutes] = singleMessage.messageTimeStamp.split(":");
    //         date.setHours(hours);
    //         date.setMinutes(minutes);
    //         const formattedTime = date.toLocaleTimeString("en-US", {
    //           hour: "numeric",
    //           minute:"numeric",
    //           hour12: true,
    //         });
    //         singleMessage.messageTimeStamp = formattedTime;

    //       }
    //   }

    //   fetchingMessagesContext.setSingleConversationInitialMessage(connectedContactsInitialMessages[findingInitialMessagesByGroupIdFromInitialMessageListIndex]);

    // }


    // live blocking updating array
    if(contextContactApi.contactBlockUpdating !== null) {

      setConnectedContactList((prevsContacts)=>{
        let findingContactIndex = prevsContacts.findIndex(a=>a.contactId === contextContactApi.contactBlockUpdating.contactId);
        prevsContacts[findingContactIndex].blockContact = !prevsContacts[findingContactIndex].blockContact;
        return [...prevsContacts];
      });
      contextContactApi.setContactBlockUpdating(null);
    }

    // this will only execute below code one time
    if (connectedContactList.length == 0 && addContactSectionContactList.length == 0) {
      axios
        .get(
          "https://localhost:44389/api/Contact/" +
            JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1]))
              .UserId
        )
        .then((responseData) => {
          let customArr = [];
          setAddContactSectionContactList(responseData.data);
          for (var singleUserAllContacts of responseData.data) {

            if (
              singleUserAllContacts.connectedInMessages ||
              singleUserAllContacts.verifiedContactUser
            ) {






              customArr.push({
                ...singleUserAllContacts,
                selectedContectStyle: false,
              });
            }
            if (singleUserAllContacts.connectedInMessages === true) {
              // here fetch the data
              const fetchingMessagesByFilteringInitialPoint = {
                currentScrollingPosition: 1,
                fetchingMessagesStorageNo: 1,
                groupId: singleUserAllContacts.groupId,
                user1: singleUserAllContacts.userId,
                user2: +(JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1])).UserId),
                lastMessagesCount: 0,
              };


              const lastMessage = singleUserAllContacts?.lastMessageOfSingleContact;
              const countUnSeenMessages = singleUserAllContacts?.countUnSeenMessages;
              setTimeout(() => {
                const getDataFromSelectorId = document.getElementById(fetchingMessagesByFilteringInitialPoint.groupId + "highlight-listMessage");
                if (lastMessage?.length > 28) {
                  getDataFromSelectorId.textContent = lastMessage?.substring(0, 25) + "....";
                  getDataFromSelectorId.style.color = "#19a299";

                  if (countUnSeenMessages === 0) {
                    getDataFromSelectorId.style.color = "#8a98ac";
                  }
                } else {
                  getDataFromSelectorId.textContent = lastMessage;
                  getDataFromSelectorId.style.color = "#19a299";

                  if (countUnSeenMessages === 0) {
                    getDataFromSelectorId.style.color = "#8a98ac";
                  }
                }
              }, 500);




            }
          }

          setConnectedContactList(customArr);
        });
    }

    // when new messages sended and user online but with other user is busy then show the number notification about how much new messages sended

    if(props.messageSendedFromContactNotify?.length > 0) {
      setConnectedContactList((prevsContact)=>{

        if(props.messageSendedFromContactNotify.split(" ")[1] === "DEL") {
          const groupId = props.messageSendedFromContactNotify.split(" ")[0];
          const findingIndex = prevsContact.findIndex(a=>a.groupId=== groupId);
          prevsContact[findingIndex].countUnSeenMessages = 0;
        } else {
          const findingIndex = prevsContact.findIndex(a=>a.groupId=== props.messageSendedFromContactNotify);
          prevsContact[findingIndex].countUnSeenMessages = prevsContact[findingIndex].countUnSeenMessages + 1;
        }



        return [...prevsContact];
      })
    }





    // for this below lines i donot required
    // if (props.connectUserInMessageSectionThroughGroupId != "") {
    //   let addContactSectionArr = addContactSectionContactList;
    //   let findValidIndex = addContactSectionArr.findIndex(
    //     (a) => a.groupId == props.connectUserInMessageSectionThroughGroupId
    //   );
    //   addContactSectionArr[findValidIndex].connectedInMessages = true;
    //   setConnectedContactList((prevs) => {
    //     return [...prevs, addContactSectionArr[findValidIndex]];
    //   });
    //   setAddContactSectionContactList(() => {
    //     return [...addContactSectionArr];
    //   });
    // }
  }, [props.EditContactName, props.messageSendedFromContactNotify, contextContactApi.contactBlockUpdating]);

    useEffect(() => {


        const loggedInUserId = JSON.parse(window.atob(localStorage.getItem("Token")?.split(".")[1])).UserId;
      setTimeout(()=>{

        signalRConnectionSingletonObj.on("UserBecomeOnline", (singleGroupId, becomeOnlineUserId) => {
          if(becomeOnlineUserId !== loggedInUserId) {
              setConnectedContactList((prevsContacts)=>{
            let updatedContact = [...prevsContacts];
            const index = updatedContact.findIndex(a=>a.userId === +becomeOnlineUserId);
            if(index != -1) {
              updatedContact[index].userAvailabilityStatus = true;
            }
                return [...updatedContact];
              });

              contextContactApi.setContactAvailability(true);

          }
        });


        signalRConnectionSingletonObj.on("UserBecomeOffline", (singleGroupId, becomeOfflineUserId) => {

          if(becomeOfflineUserId !== loggedInUserId) {
            setConnectedContactList((prevsContacts)=>{
          let updatedContact = [...prevsContacts];
          const index = updatedContact.findIndex(a=>a.userId === +becomeOfflineUserId);
          if(index != -1) {
            updatedContact[index].userAvailabilityStatus = false;


          }

              return [...updatedContact];
            });

            contextContactApi.setContactAvailability(false);

        }

        });



        signalRConnectionSingletonObj.on("BlockingOrUnlockingContactLive", (groupId, userWhoBlockedYouId) => {

          if(userWhoBlockedYouId !== +(loggedInUserId)) {

            setConnectedContactList((prevs)=>{
              debugger;
              const findingIndexOfGroup = prevs.findIndex(a=>a.groupId === groupId);
              prevs[findingIndexOfGroup].blockContactByConnectedUser = !prevs[findingIndexOfGroup].blockContactByConnectedUser;
              return [...prevs];

            });

            setAddContactSectionContactList((prevs)=>{
              const findingIndexOfGroup = prevs.findIndex(a=>a.groupId === groupId);
              prevs[findingIndexOfGroup].blockContactByConnectedUser = !prevs[findingIndexOfGroup].blockContactByConnectedUser;
              return [...prevs];

            });

          contextContactApi.setContactBlockUpdatingChatSection(true);





          }

        });






      },2500)




    }, []);

  // function changeSelectedContactEffect(i) {
  //   let fetchArrData = [...connectedContactList];
  //   setSelectedIndex(i);
  //   fetchArrData[selectedIndex].selectedContectStyle = false;
  //   fetchArrData[i].selectedContectStyle = true;
  //   setConnectedContactList(() => {
  //     return fetchArrData;
  //   });
  // }

  function logOut() {
    localStorage.removeItem("Token");
    loggedInContextApi.isLoggedIn(false);
    navigate("/");
  }

  function changeView() {
    props.showChatSectionn();
  }

  function updateContactListForAddingNewContactHandler(newContact) {
    setAddContactSectionContactList((prevs) => {
      return [...prevs, newContact];
    });

    setConnectedContactList((prevs)=>{
      return [...prevs, newContact];
    })
  }

  const changeSelectedContactEffectMemoized = useCallback(
    (i) => {
      let fetchArrData = [...connectedContactList]; // like here i am using the state data of the component so i have to pass the dependecies here of that state.

      fetchArrData[i].selectedContectStyle = false;
      fetchArrData[i].selectedContectStyle = true;
      setConnectedContactList(() => {
        return fetchArrData; // if i am changing the something inside the connectedContactList then obviously connectedContact again iterate
      });
    },
    [connectedContactList]
  );

  return (
    <>
      <div
        className={`${sidebarCss["sidebar"]} ${
          props.closeContactDetailInResponsiveMobile == true ||
          loggedInContextApi.getShowSideBarSection == false
            ? sidebarCss["hide-sidebar"]
            : "show-side-bar"
        }`}
      >
        {/* logo and application name sections */}
        <div className={sidebarCss["paen-chat-logo-section"]}>
          <div className={sidebarCss["chat-logo-text"]}>
            <img
              src={require("../../assest/chat-logo/chat logo pic.PNG")}
              width="40px"
              height="40px"
              alt=""
            />{" "}
            &nbsp;
            <span className={sidebarCss["chat-name"]}>{menuSelectedVal}</span>
          </div>

          <div className={sidebarCss["chat-log-out-btn"]}>
            <button
              className={sidebarCss["logout-btn"]}
              title="Sign out"
              onClick={logOut}
            >
              <FontAwesomeIcon
                className={sidebarCss["logout-icon"]}
                icon={faArrowRightFromBracket}
              />
            </button>
          </div>
        </div>

        {/* search bar section */}
        {menuSelectedVal == "Chats" || menuSelectedVal == "Add Contact" ? (
          <div className={sidebarCss["search-bar-section"]}>
            <input
              type="text"
              placeholder="Search"
              className={sidebarCss["search-input"]}
            />

            <button className={sidebarCss["search-btn-contact"]}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        ) : (
          <div className={sidebarCss["not-search-bar-show"]}></div>
        )}

        {/* Add Contact */}
        {/* Contact section */}

        <div
          className={
            sidebarCss["contact-section-and-show-view-by-selected-menu"]
          }
        >
          {menuSelectedVal == "Chats"
            ? connectedContactList.length > 0 &&
              connectedContactList.map((singleContact, index) => {
                return (
                  <div key={singleContact.userId}>
                    <UserChat
                      index={index}
                      AddContactData={singleContact}
                      changeSelectedContactEffect={
                        changeSelectedContactEffectMemoized
                      }
                      showChatSection={changeView}
                      selectedChatUperProfileData={props.profileUperData}
                      // sendMessageToServer={props.senderMessageVal}
                      getSenderMessage={props.gettingSenderMessage}
                      messageSendFromUser={props.messageDataSendedFromUser}
                    />
                  </div>
                );
              })
            : null}
          {menuSelectedVal == "Add Contact" ? (
            <AddContact
              contactEdited={props.EditContactName}
              // refreshContectProp={props.refreshingContect}
              showChatOnAddContactSection={props.showAddContectSection}
              openAddContactDialog={props.addContactOpen}
              showAddContactPanelDataObj={props.selectedNewContactObj}
              showChatSection={changeView}
              allContactList={addContactSectionContactList}
              updateContactListForAddNewContact={
                updateContactListForAddingNewContactHandler
              }
            />
          ) : null}
          {menuSelectedVal == "User Profile" ? (
            <UserEditProfile showProfileDetail={true} />
          ) : (
            <UserEditProfile showProfileDetail={false} />
          )}
          {menuSelectedVal == "Setting" ? <h1>Hello setting</h1> : null}
        </div>

        {/* sidebar menu */}
        <Menu changeSidebarViewByMenuClicked={setMenuSelectedVal} />
      </div>
    </>
  );
};

export default memo(Sidebar);
