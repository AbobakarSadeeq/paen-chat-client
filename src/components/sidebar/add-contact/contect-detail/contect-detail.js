import React from "react";
import ContectDetailCss from "./contect-detail.module.css";
import NoUserImg from "../../../../assest/No Image.jpg";
import { HiBadgeCheck } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBan,
  faCheck,
  faCircleXmark,
  faEdit,
  faMessage,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import LoggedInContext from "../../../../context/loggedIn/loggedIn";
import { useEffect } from "react";
import { useState } from "react";
import EditContectModel from "./edit-contect-detail/edit-contect-detail";
import BlockContact from "./block-contact/block-contect";
import UnlockContact from "./unlock-contact/unlock-contact";
import ContactContext from "../../../../context/contact-context/contact-context";

const ContectDetail = (props) => {
  const path = useLocation();
 const contextApi = useContext(LoggedInContext);
  const contactContextApi = useContext(ContactContext);

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

  const [blockUserModel, setBlockUserModel] = useState(() => {
    return false;
  });

  const [contactBlocked, setContactBlocked] = useState(() => {
    return false;
  });

  const [unlockingContactModel, setUnlockingContactModel] = useState(() => {
    return false;
  });




  const [hideContactDetail, setHideContactDetail] = useState(() => {
    return false;
  });

  function closeContactDetail() {
    const selectedQueryParameterName = path.search;
    if (selectedQueryParameterName == "?AddContact") {
      contextApi.showContactDetailHandler("AddContact");
      setHideContactDetail(props.isShowContactDetail);
    } else if (selectedQueryParameterName == "?main-chat-section") {
      contextApi.showContactDetailHandler("chat");
    }
  }

  useEffect(() => {
    console.log(props.detail);
    setEditedContactName("");

    if (props.detail.blockContact === true) {
      setContactBlocked(true);
    } else {
      setContactBlocked(false);
    }
  }, [props.detail]);

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

  function BlockUserModelHandler() {
    setBlockUserModel(!blockUserModel);




  }

  function blockContactViewChangeHandler() {
    // send here the

    contactContextApi.setContactBlockUpdating(props.detail);

    setContactBlocked(true);
    let changingViewOfConnectedContact = Math.random();
    contextApi.updatedContactNameVal(
      "blocked" + changingViewOfConnectedContact
    );
  }

  function unlockingBlockContactHandler() {
    setUnlockingContactModel(!unlockingContactModel);
  }

  function unlockingBlockContacViewChangeHandler() {
    contactContextApi.setContactBlockUpdating(props.detail);
    setContactBlocked(false);

    let changingViewOfConnectedContact = Math.random();
    contextApi.updatedContactNameVal(
      "unlocked" + changingViewOfConnectedContact
    );
  }

  return (
    <div
      className={`${ContectDetailCss["contect-main-div"]} ${
        props.isShowContactDetail == true
          ? ContectDetailCss["show-contact"]
          : "remove-contact-detail-and-open-sidebar"
      }`}
    >
      <FontAwesomeIcon
        icon={faArrowLeft}
        className={ContectDetailCss["back-btn-to-Contact"]}
        onClick={closeContactDetail}
      />

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
              {contactBlocked ? (
                <>
                  <FontAwesomeIcon
                    icon={faUnlock}
                    className={ContectDetailCss["icons"]}
                    onClick={unlockingBlockContactHandler}
                    title="Unlock contact"
                  />
                  <h3 style={{ color: "red" }}>This contact is blocked.</h3>
                </>
              ) : (
                <>
                  {/* <FontAwesomeIcon
                    icon={faMessage}
                    className={ContectDetailCss["icons"]}
                    onClick={OpenSelectedUserChat}
                    title="Open contact chat"
                  /> */}
                  <FontAwesomeIcon
                    icon={faEdit}
                    className={ContectDetailCss["icons"]}
                    onClick={OpenEditContactModel}
                    title="Edit Contact"
                  />
                  <FontAwesomeIcon
                    icon={faBan}
                    className={ContectDetailCss["icons"]}
                    onClick={BlockUserModelHandler}
                    title="Blocking contact"
                  />
                </>
              )}
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

      {blockUserModel ? (
        <BlockContact
          hideDialog={BlockUserModelHandler}
          contactId={props.detail.contactId}
          blockedDone={blockContactViewChangeHandler}
        />
      ) : null}

      {unlockingContactModel ? (
        <UnlockContact
          hideDialog={unlockingBlockContactHandler}
          contactId={props.detail.contactId}
          unlockingDone={unlockingBlockContacViewChangeHandler}
        />
      ) : null}
    </div>
  );
};

export default ContectDetail;
