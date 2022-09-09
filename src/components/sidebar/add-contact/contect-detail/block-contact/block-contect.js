import React from "react";
import { useState, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import axios from "axios";
const BlockContact = (props) => {
  function blockUser() {
    axios
      .get(
        "https://localhost:44389/api/Contact/BlockingContact/" + props.contactId
      )
      .then((response) => {
        props.hideDialog();
        props.blockedDone();
      });
  }

  return (
    <>
      <ConfirmDialog
        visible={true}
        onHide={props.hideDialog}
        message="Do you want to block this contact?"
        header="Block contact"
        icon="pi pi-info-circle"
        accept={blockUser}
        acceptClassName="p-button-danger"
        contentStyle={{ backgroundColor: "#2c3638", color: "#8a98ac" }}
        headerStyle={{ backgroundColor: "#2c3638", color: "#8a98ac" }}
      />
    </>
  );
};

export default BlockContact;
