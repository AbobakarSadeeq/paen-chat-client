import React, { useState } from "react";
import Chat from "../chat-section/chat-section";
import Sidebar from "../sidebar/sidebar";
import layoutCss from "./layout.module.css";
import AddContactModel from '../../Models/add-contact-model/add-contact-model';
const Layout = (props) => {
  const [openContactModel, setContactModel] = useState(() => {
    return false;
  });

  function contactAddModel() {
    setContactModel(!openContactModel);
  }

  return (
    <>
      {/* Models */}
      {openContactModel ? (
        <AddContactModel hideDialog={contactAddModel} />
      ) : null}

      <div className={layoutCss["main-layout"]}>
        <Sidebar addContactOpen={setContactModel} />
        {/* <Home /> */}

        <Chat />
      </div>
    </>
  );
};

export default Layout;
