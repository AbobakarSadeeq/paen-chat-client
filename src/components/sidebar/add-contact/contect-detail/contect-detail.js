import React from "react";
import ContectDetailCss from "./contect-detail.module.css";
import NoUserImg from "../../../../assest/No Image.jpg";
import { HiBadgeCheck } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleXmark,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useContext } from "react";
import LoggedInContext from "../../../../context/loggedIn/loggedIn";
import { useEffect } from "react";
import { useState } from "react";
const ContectDetail = (props) => {
  console.log(props);
  const navigate = useNavigate();

  const contextApi = useContext(LoggedInContext);


  function OpenSelectedUserChat() {
    contextApi.showChatSectionThroughUserDetailProfileSection({
      ...props.detail,
    });
    contextApi.messageSectionOpenend(true);
  }

  return (
    <div className={ContectDetailCss["contect-main-div"]}>
      <div className={ContectDetailCss["Contect-detail"]}>
        <div className={ContectDetailCss["ContectImage"]}>
          <img
            src={
              props.detail.userImage != null && props.detail.userImage != ""
                ? props.detail.userImage
                : NoUserImg
            }
            alt=""
          />
        </div>
        <br />

        <div className={ContectDetailCss["contect-detail-text"]}>
          <span>
            <strong>Verified: </strong>
          </span>
          <span className={ContectDetailCss["val"]}>
            {props.detail.verifiedContactUser ? (
              <FontAwesomeIcon
                icon={faCheck}
                className={ContectDetailCss["icons"]}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={ContectDetailCss["icons"]}
              />
            )}
          </span>
          <br />
          <span>
            <strong>Name: </strong>
          </span>
          <span className={ContectDetailCss["val"]}>
            {props.detail.contactName}
          </span>
          <br />
          <span>
            <strong>Contect Number: </strong>
          </span>{" "}
          <span className={ContectDetailCss["val"]}>
            {props.detail.phoneNumber}
          </span>{" "}
          <br />
          <span>
            <strong>About: </strong>
          </span>{" "}
          <span className={ContectDetailCss["val"]}>
            {props.detail.aboutStatus}
          </span>
        </div>

        <div className={ContectDetailCss["contect-options"]}>
          {props.detail.verifiedContactUser ? (
            <FontAwesomeIcon
              icon={faMessage}
              className={ContectDetailCss["icons"]}
              onClick={OpenSelectedUserChat}
            /> // send default message and store it in the last_message of contact
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ContectDetail;
