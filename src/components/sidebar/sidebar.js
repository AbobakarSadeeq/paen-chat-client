import React, { memo, useContext, useEffect, useMemo, useState } from "react";
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

const Sidebar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInContextApi = useContext(LoggedInContext);



  const [menuSelectedVal, setMenuSelectedVal] = useState(() => {
    return "Chats";
  });

  const [connectedContactList, setConnectedContactList] = useState(() => {
    return [];
  });

  const [selectedIndex, setSelectedIndex] = useState(() => {
    return 0;
  });



  const [addContactSectionContactList, setAddContactSectionContactList] =
    useState(() => {
      return [];
    });

  useEffect(() => {

    if (
      connectedContactList.length == 0 &&
      addContactSectionContactList.length == 0
    ) {
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
          }

          setConnectedContactList(customArr);
        });
    }

    if (props.connectUserInMessageSectionThroughGroupId != "") {
      let addContactSectionArr = addContactSectionContactList;
      let findValidIndex = addContactSectionArr.findIndex(
        (a) => a.groupId == props.connectUserInMessageSectionThroughGroupId
      );
      addContactSectionArr[findValidIndex].connectedInMessages = true;
      setConnectedContactList((prevs) => {
        return [...prevs, addContactSectionArr[findValidIndex]];
      });
      setAddContactSectionContactList(() => {
        return [...addContactSectionArr];
      });
    }
  }, [props.EditContactName, props.connectUserInMessageSectionThroughGroupId]);

  function changeSelectedContactEffect(i) {
    let fetchArrData = [...connectedContactList];
    setSelectedIndex(i);
    fetchArrData[selectedIndex].selectedContectStyle = false;
    fetchArrData[i].selectedContectStyle = true;
    setConnectedContactList(() => {
      return fetchArrData;
    });
  }

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
  }

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
                        changeSelectedContactEffect={changeSelectedContactEffect}
                       showChatSection={changeView}
                       selectedChatUperProfileData={props.profileUperData}
                       sendMessageToServer={props.senderMessageVal}
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
              //    refreshContectProp={props.refreshingContect}
              showChatOnAddContactSection={props.showAddContectSection}
              openAddContactDialog={props.addContactOpen}
              showAddContactPanelDataObj={props.selectedNewContactObj}
              showChatSection={changeView} // this is the selected thing
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

export default Sidebar;
