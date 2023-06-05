import React, { useContext } from "react";
import MenuCss from "./menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import {
  faGear,
  faPen,
  faUser,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import LoggedInContext from "../../../context/loggedIn/loggedIn";

const Menu = (props) => {
  const contextApi = useContext(LoggedInContext);

  function clickMenu(selectedLinkName) {
    console.log(window.screen.width);

    props.changeSidebarViewByMenuClicked(selectedLinkName);

    //  if(window.screen.width > 768 && (selectedLinkName == "AddContact" || selectedLinkName == "Chats")
    //  && contextApi.messageSectionOpenend ==) {
    // //   contextApi.messageSectionOpenend(true);
    // // }
  }

  return (
    <>
      <ul className={MenuCss["chat-menu"]}>
        <li>
          <button onClick={() => clickMenu("Chats")} className={MenuCss["btn"]}>
            <NavLink
              className={({ isActive }) =>
                isActive ? MenuCss.active : MenuCss.inactive
              }
              to={"/Chats?main-chat-section"}
            >
              <FontAwesomeIcon icon={faComment} />{" "}
            </NavLink>
          </button>
        </li>
        <li>
          <button
            onClick={() => clickMenu("Add Contact")}
            className={MenuCss["btn"]}
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? MenuCss.active : MenuCss.inactive
              }
              to={"/AddContact?AddContact"}
            >
              <FontAwesomeIcon icon={faPen} />
            </NavLink>
          </button>
        </li>
        <li>
          <button
            onClick={() => clickMenu("User Profile")}
            className={MenuCss["btn"]}
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? MenuCss.active : MenuCss.inactive
              }
              to={"UserProfile?UserProfile"}
            >
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          </button>
        </li>
        <li>
          <button
            onClick={() => clickMenu("Setting")}
            className={MenuCss["btn"]}
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? MenuCss.active : MenuCss.inactive
              }
              to={"/Setting?Setting"}
            >
              <FontAwesomeIcon icon={faGear} />
            </NavLink>
          </button>
        </li>
      </ul>
    </>
  );
};

export default Menu;
