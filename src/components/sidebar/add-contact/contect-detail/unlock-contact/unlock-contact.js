import React from "react";
import { useState, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import axios from "axios";
const UnlockContact = (props) => {
  function blockUser() {
    axios
      .get(
        "https://localhost:44389/api/Contact/UnlockingContact/" + props.contactId
      )
      .then((response) => {
        props.hideDialog();
        props.unlockingDone();
        
      });   
  }

  return (
    <>
      <ConfirmDialog
        visible={true}
        onHide={props.hideDialog}
        message="Do you want to unlock this contact?"
        header="Unlock contact"
        icon="pi pi-info-circle"
        accept={blockUser}
        acceptClassName="p-button-primary"
        contentStyle={{ backgroundColor: "#2c3638", color: "#8a98ac" }}
        headerStyle={{ backgroundColor: "#2c3638", color: "#8a98ac" }}
      />
    </>
  );
};

export default UnlockContact;
