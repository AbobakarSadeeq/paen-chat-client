import React, { useContext, useEffect, useState } from "react";
import sidebarCss from "./sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
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

  useEffect(() => {
  
    axios
      .get(
        "https://localhost:44389/api/Contact/ListOfChatConnectedWithSingleUser/" +
          JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1]))
            .UserId
      )
      .then((responseData) => {
        let customArr = [...responseData.data];
        customArr = customArr.map((obj) => ({
          ...obj,
          selectedContectStyle: false,
        }));
        setConnectedContactList(customArr);
      });

  }, [props.EditContactName]);

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

  return (
    <>
      <div className={sidebarCss["sidebar"]}>
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
                  <div key={index}>
                    <UserChat
                      index={index}
                      AddContactData={singleContact}
                      changeSelectedContactEffect={changeSelectedContactEffect}
                      showChatSection={changeView}
                      selectedChatUperProfileData={props.profileUperData}
                      sendMessageToServer={props.senderMessageVal}
                      getSenderMessage={props.gettingSenderMessage}
                    />
                  </div>
                );
              })
            : null}
          {menuSelectedVal == "Add Contact" ? (
            <AddContact
              contactEdited={props.EditContactName}
              refreshContectProp={props.refreshingContect}
              showChatOnAddContactSection={props.showAddContectSection}
              openAddContactDialog={props.addContactOpen}
              showAddContactPanelDataObj={props.selectedNewContactObj}
              showChatSection={changeView}
            />
          ) : null}
          {menuSelectedVal == "User Profile" ? <UserEditProfile /> : null}
          {menuSelectedVal == "Setting" ? <h1>Hello setting</h1> : null}
        </div>

        {/* sidebar menu */}
        <Menu changeSidebarViewByMenuClicked={setMenuSelectedVal} />
      </div>
    </>
  );
};

export default Sidebar;
