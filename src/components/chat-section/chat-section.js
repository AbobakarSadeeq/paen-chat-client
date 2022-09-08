import React from "react";
import ChatCss from "./chat-section.module.css";
import LeftMessageSection from "./left-message-section/left-message-section";
import RightMessageSection from "./right-message-section/right-message-section";
import MessageSend from "./message-send-section/message-send-section";
import MessageSenderProfile from "./message-sender-profile/message-sender-profile";
import { useEffect } from "react";
import { useContext } from "react";
import LoggedInContext from "../../context/loggedIn/loggedIn";

const Chat = (props) => {
  useEffect(()=>{
    
    
  },[])
  
  return (
    <>
    
      <div>
        {/* profile section */}
        <MessageSenderProfile profile={props.profileData} />

        {/* chat read section */}

        <div className={ChatCss["chat-read-section"]}>
          <LeftMessageSection />
          <RightMessageSection />
        </div>

        {/* message send section */}
        <MessageSend />
      </div>
    </>
  );
};

export default Chat;
