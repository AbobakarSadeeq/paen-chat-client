import { createContext, useState } from "react";

const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
  const [addNewContact, setAddNewContact] = useState(() => {
    return {};
  });

  return (
    <>
      <ContactContext.Provider value={{ addNewContact, setAddNewContact }}>
        {children}
      </ContactContext.Provider>
    </>
  );
};

export { ContactContextProvider };
export default ContactContext;
