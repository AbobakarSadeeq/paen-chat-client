import { createContext, useState } from "react";

const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
  const [addNewContact, setAddNewContact] = useState(() => {
    return {};
  });

  const [contactAvailability, setContactAvailability] = useState(()=>{
    return false;
  })

  const [contactBlockUpdating, setContactBlockUpdating] = useState(()=>{
    return null;
  })

  return (
    <>
      <ContactContext.Provider value={{ addNewContact, setAddNewContact,
       contactAvailability, setContactAvailability,
       contactBlockUpdating, setContactBlockUpdating
        }}>
        {children}
      </ContactContext.Provider>
    </>
  );
};

export { ContactContextProvider };
export default ContactContext;
