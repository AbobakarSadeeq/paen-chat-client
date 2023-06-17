import { createContext, useState } from "react";

const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
  const [addNewContact, setAddNewContact] = useState(() => {
    return {};
  });

  const [contactAvailability, setContactAvailability] = useState(()=>{
    return false;
  })

  return (
    <>
      <ContactContext.Provider value={{ addNewContact, setAddNewContact, contactAvailability, setContactAvailability }}>
        {children}
      </ContactContext.Provider>
    </>
  );
};

export { ContactContextProvider };
export default ContactContext;
