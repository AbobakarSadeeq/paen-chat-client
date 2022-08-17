import React, { useState } from "react";
import addContactCss from "./add-contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import UserChat from "../user-chat/user-chat";

const AddContact = (props) => {
  function openModelHandler() {
    props.openAddContactDialog(true);
  }

  return (
    <>
      <div className={addContactCss["add-contact-section"]}>
        <button onClick={openModelHandler}>
          Add Contact &nbsp;
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </div>

      <div className={addContactCss["users-section"]}>
        <UserChat />
      </div>
    </>
  );
};

export default AddContact;
