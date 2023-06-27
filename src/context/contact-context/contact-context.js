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

  const [contactBlockUpdatingChatSection, setContactBlockUpdatingChatSection] = useState(()=>{
    return false;
  });

  const [updatingUserContactProfile, setUpdatingUserContactProfile] = useState(()=>{
    return null;
  })

  return (
    <>
      <ContactContext.Provider value={{ addNewContact, setAddNewContact,
       contactAvailability, setContactAvailability,
       contactBlockUpdating, setContactBlockUpdating,
       contactBlockUpdatingChatSection, setContactBlockUpdatingChatSection,
       updatingUserContactProfile, setUpdatingUserContactProfile
        }}>
        {children}
      </ContactContext.Provider>
    </>
  );
};

export { ContactContextProvider };
export default ContactContext;
