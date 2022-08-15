import React, { useEffect, useState } from "react";
import sidebarCss from "./sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  faArrowRightFromBracket,
  faCoffee,
  faComment,
  faGear,
  faMessage,
  faPen,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import UserChat from "./user-chat/user-chat";
import Menu from "./menu/menu";

const Sidebar = (props) => {
  const [menuSelectedVal, setMenuSelectedVal] = useState(() => {
    return "Chats";
  });

  useEffect(() => {
    console.log(menuSelectedVal);
  }, [menuSelectedVal]);

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
            <span className={sidebarCss["chat-name"]}>Paen-Chat</span>
          </div>

          <div className={sidebarCss["chat-log-out-btn"]}>
            <button className={sidebarCss["logout-btn"]}>
              <FontAwesomeIcon
                className={sidebarCss["logout-icon"]}
                icon={faArrowRightFromBracket}
              />
            </button>
          </div>
        </div>

        {/* search bar section */}
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

        {/* Contact section */}

        <div
          className={
            sidebarCss["contact-section-and-show-view-by-selected-menu"]
          }
        >
          {menuSelectedVal == "Chats" ? <UserChat /> : null}
          {menuSelectedVal == "AddContact" ? <h1>Hello brother</h1> : null}
          {menuSelectedVal == "UserProfile" ? <h1>Hello profile</h1> : null}
          {menuSelectedVal == "Setting" ? <h1>Hello setting</h1> : null}
        </div>

        {/* sidebar menu */}
        <Menu changeSidebarViewByMenuClicked={setMenuSelectedVal} />
      </div>
    </>
  );
};

export default Sidebar;
