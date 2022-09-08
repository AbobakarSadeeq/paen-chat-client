import React from "react";
import ContectDetailCss from "./contect-detail.module.css";
import NoUserImg from "../../../../assest/No Image.jpg";
import { HiBadgeCheck } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircleXmark,
  faEdit,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useContext } from "react";
import LoggedInContext from "../../../../context/loggedIn/loggedIn";
import { useEffect } from "react";
import { useState } from "react";
import EditContectModel from "./edit-contect-detail/edit-contect-detail";

const ContectDetail = (props) => {
  const [editContactModel, setEditContactModel] = useState(() => {
    return false;
  });

  const [splitFirstName, setSplitFirstName] = useState(() => {
    return "";
  });

  const [splitLastName, setSplitLastName] = useState(() => {
    return "";
  });

  const [editedContactName, setEditedContactName] = useState(() => {
    return "";
  });

  useEffect(() => {
    setEditedContactName("");
  }, [props.detail]);

  const contextApi = useContext(LoggedInContext);

  function OpenSelectedUserChat() {
    contextApi.showChatSectionThroughUserDetailProfileSection({
      ...props.detail,
    });
    contextApi.messageSectionOpenend(true);
  }

  function OpenEditContactModel() {
    var splitingContactName = props.detail.contactName.split(" ");
    setSplitFirstName(splitingContactName[0]);
    setSplitLastName(splitingContactName[1]);
    setEditContactModel(!editContactModel);
  }

  function editedContactNameHandler(val) {
    setEditedContactName(val);
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
            {props.detail.verifiedContactUser == false ? (
              <span style={{ color: "red" }}>No Name</span>
            ) : editedContactName ? (
              editedContactName
            ) : (
              props.detail.contactName
            )}
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
            {props.detail.verifiedContactUser == false ? (
              <span style={{ color: "red" }}>No About</span>
            ) : (
              props.detail.aboutStatus
            )}
          </span>
        </div>

        <div className={ContectDetailCss["contect-options"]}>
          {props.detail.verifiedContactUser ? (
            <>
              <FontAwesomeIcon
                icon={faMessage}
                className={ContectDetailCss["icons"]}
                onClick={OpenSelectedUserChat}
              />
              <FontAwesomeIcon
                icon={faEdit}
                className={ContectDetailCss["icons"]}
                onClick={OpenEditContactModel}
              />
            </>
          ) : (
            <h3 style={{ color: "red" }}>
              You cannot send a message to unknown register user
            </h3>
          )}
        </div>
      </div>
      {editContactModel ? (
        <EditContectModel
          SelectedContactData={{
            firstName: splitFirstName,
            lastName: splitLastName,
            contactId: props.detail.contactId,
          }}
          editContactName={editedContactNameHandler}
          hideDialog={OpenEditContactModel}
        />
      ) : null}
    </div>
  );
};

export default ContectDetail;
