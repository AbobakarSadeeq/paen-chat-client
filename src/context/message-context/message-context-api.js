import React from "react";
const MessageContextApi = React.createContext({
  sendMessageFunc: (msgVal) => {},
});

export default MessageContextApi;
