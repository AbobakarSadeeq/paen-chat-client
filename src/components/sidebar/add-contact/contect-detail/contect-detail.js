import React from "react";
import ContectDetailCss from "./contect-detail.module.css";
import NoUserImg from "../../../../assest/No Image.jpg";
import { HiBadgeCheck } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMessage } from "@fortawesome/free-solid-svg-icons";
const ContectDetail = (props) => {
  console.log(props);
  return (
    <div className={ContectDetailCss["contect-main-div"]}>
      <div className={ContectDetailCss["Contect-detail"]}>
        <div className={ContectDetailCss["ContectImage"]}>
          <img
            src={
              props.detail.userImage != "" ? props.detail.userImage : NoUserImg
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
            <FontAwesomeIcon
              icon={faCheck}
              className={ContectDetailCss["icons"]}
            />
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
          <FontAwesomeIcon
            icon={faMessage}
            className={ContectDetailCss["icons"]}
          />
          <FontAwesomeIcon
            icon={faMessage}
            className={ContectDetailCss["icons"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ContectDetail;
