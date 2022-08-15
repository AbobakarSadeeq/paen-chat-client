import React from "react";
import Chat from "../chat-section/chat-section";
import Sidebar from "../sidebar/sidebar";
import layoutCss from "./layout.module.css";

const Layout = () => {
  return (
    <>
      <div className={layoutCss["main-layout"]}>
        <Sidebar />
        {/* <Home /> */}

        <Chat />
      </div>
    </>
  );
};

export default Layout;
