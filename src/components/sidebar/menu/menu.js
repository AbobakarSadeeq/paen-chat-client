import React from "react";
import MenuCss from "./menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import {
  faGear,
  faPen,
  faUser,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
const Menu = (props) => {
  
  function clickMenu(selectedLinkName) {
    props.changeSidebarViewByMenuClicked(selectedLinkName);
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
              to={"/Chats"}
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
              to={"/AddContact"}
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
              to={"UserProfile"}
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
              to={"/Setting"}
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
