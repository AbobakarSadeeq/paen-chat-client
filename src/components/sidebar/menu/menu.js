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
const Menu = () => {
  return (
    <>
      <ul className={MenuCss["chat-menu"]}>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? MenuCss.active : MenuCss.inactive
            }
            to={"/"}
          >
            <FontAwesomeIcon icon={faComment} />{" "}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? MenuCss.active : MenuCss.inactive
            }
            to={"/rdgh"}
          >
            <FontAwesomeIcon icon={faPen} />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? MenuCss.active : MenuCss.inactive
            }
            to={"/dfg"}
          >
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? MenuCss.active : MenuCss.inactive
            }
            to={"/fgdh"}
          >
            <FontAwesomeIcon icon={faGear} />
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Menu;
