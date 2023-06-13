import { createContext, useState } from "react";

const FetchingMessagesContext = createContext();

const FetchingMessagesContextProvider = (props) =>{

   const [singleConversationInitialMessage, setSingleConversationInitialMessage] = useState(()=>{
      return [];
   });

   const [selectedContactGroupForToFetchingItsMessage, setSelectedContactGroupForToFetchingItsMessage] = useState(()=>{
      return "";
   })

   const [singleConversationAllNewMessage, setSingleConversationAllNewMessage] = useState(()=>{
      return "";
   })




   return (
      <FetchingMessagesContext.Provider value={{
      selectedContactGroupForToFetchingItsMessage,
      setSelectedContactGroupForToFetchingItsMessage,

      singleConversationInitialMessage,
      setSingleConversationInitialMessage,

      singleConversationAllNewMessage,
      setSingleConversationAllNewMessage
      
      }}>

      {props.children}
      </FetchingMessagesContext.Provider>
   )
}

export { FetchingMessagesContextProvider };
export default FetchingMessagesContext;