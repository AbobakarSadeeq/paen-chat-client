import React from "react";
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

const Sidebar = () => {
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
        <div className={sidebarCss["contact-section"]}>
          <div className={sidebarCss["contact-border-bottom"]}>
            <div className={sidebarCss["main-contacts-section"]}>
              <div className={sidebarCss["contact-img"]}>
                <img
                  src={require("../../assest/chat-logo/favicon.ico")}
                  alt=""
                />
              </div>

              <div className={sidebarCss["contact-name-and-messages"]}>
                <span>
                  <strong>Abobakar Sadeeq</strong>
                </span>
                <p>hi how are you sadeeq</p>
              </div>

              <div className={sidebarCss["date-connection-on"]}>
                <span>Mar 25</span>
              </div>
            </div>
          </div>

          <div className={sidebarCss["contact-border-bottom"]}>
            <div className={sidebarCss["main-contacts-section"]}>
              <div className={sidebarCss["contact-img"]}>
                <img
                  src={require("../../assest/chat-logo/favicon.ico")}
                  alt=""
                />
              </div>

              <div className={sidebarCss["contact-name-and-messages"]}>
                <span>
                  <strong>Abobakar Sadeeq</strong>
                </span>
                <p>hi how are you sadeeq</p>
              </div>

              <div className={sidebarCss["date-connection-on"]}>
                <span>Mar 25</span>
              </div>
            </div>
          </div>
          <div className={sidebarCss["contact-border-bottom"]}>
            <div className={sidebarCss["main-contacts-section"]}>
              <div className={sidebarCss["contact-img"]}>
                <img
                  src={require("../../assest/chat-logo/favicon.ico")}
                  alt=""
                />
              </div>

              <div className={sidebarCss["contact-name-and-messages"]}>
                <span>
                  <strong>Abobakar Sadeeq</strong>
                </span>
                <p>hi how are you sadeeq</p>
              </div>

              <div className={sidebarCss["date-connection-on"]}>
                <span>Mar 25</span>
              </div>
            </div>
          </div>

          <div className={sidebarCss["contact-border-bottom"]}>
            <div className={sidebarCss["main-contacts-section"]}>
              <div className={sidebarCss["contact-img"]}>
                <img
                  src={require("../../assest/chat-logo/favicon.ico")}
                  alt=""
                />
              </div>

              <div className={sidebarCss["contact-name-and-messages"]}>
                <span>
                  <strong>Abobakar Sadeeq</strong>
                </span>
                <p>hi how are you sadeeq</p>
              </div>

              <div className={sidebarCss["date-connection-on"]}>
                <span>Mar 25</span>
              </div>
            </div>
          </div>

          <div className={sidebarCss["contact-border-bottom"]}>
            <div className={sidebarCss["main-contacts-section"]}>
              <div className={sidebarCss["contact-img"]}>
                <img
                  src={require("../../assest/chat-logo/favicon.ico")}
                  alt=""
                />
              </div>

              <div className={sidebarCss["contact-name-and-messages"]}>
                <span>
                  <strong>Abobakar Sadeeq</strong>
                </span>
                <p>hi how are you sadeeq</p>
              </div>

              <div className={sidebarCss["date-connection-on"]}>
                <span>Mar 25</span>
              </div>
            </div>
          </div>

          <div className={sidebarCss["contact-border-bottom"]}>
            <div className={sidebarCss["main-contacts-section"]}>
              <div className={sidebarCss["contact-img"]}>
                <img
                  src={require("../../assest/chat-logo/favicon.ico")}
                  alt=""
                />
              </div>

              <div className={sidebarCss["contact-name-and-messages"]}>
                <span>
                  <strong>Abobakar Sadeeq</strong>
                </span>
                <p>hi how are you sadeeq</p>
              </div>

              <div className={sidebarCss["date-connection-on"]}>
                <span>Mar 25</span>
              </div>
            </div>
          </div>
        </div>

        <div></div>
        {/* react active link here */}
        <ul className={sidebarCss["chat-menu"]}>
          <li>
          <FontAwesomeIcon icon={faComment} />
          </li>
          <li>
          <FontAwesomeIcon icon={faPen} />

          </li>
          <li>
          <FontAwesomeIcon icon={faUser} />
          </li>
          <li>
           <FontAwesomeIcon icon={faGear} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
