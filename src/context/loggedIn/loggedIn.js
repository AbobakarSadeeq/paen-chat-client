import React from "react";
const LoggedInContext = React.createContext({
  isLoggedIn: false,
  showAddContactMainPanel: false,
  showChatSectionThroughUserDetailProfileSection: null,
  messageSectionOpenend: false
});

export default LoggedInContext;
