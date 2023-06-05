import React from "react";
const LoggedInContext = React.createContext({
  isLoggedIn: false,
  showAddContactMainPanel: false,
  showChatSectionThroughUserDetailProfileSection: null, // this will show the data of contact through contact-detail
  messageSectionOpenend: false,
  updatedContactNameVal:null,
  showContactDetailHandler:null
});

export default LoggedInContext;
