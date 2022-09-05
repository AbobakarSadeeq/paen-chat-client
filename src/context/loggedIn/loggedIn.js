import React from "react";
const LoggedInContext = React.createContext({
  isLoggedIn: false,
  showAddContactMainPanel:false
});

export default LoggedInContext;
