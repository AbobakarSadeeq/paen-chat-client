import { createContext, useState } from "react";

const FetchingMessagesContext = createContext();

const FetchingMessagesContextProvider = (props) =>{

   const [singleConversationInitialMessage, setSingleConversationInitialMessage] = useState(()=>{
      return [];
   });

   const [selectedContactGroupForToFetchingItsMessage, setSelectedContactGroupForToFetchingItsMessage] = useState(()=>{
      return "";
   })

   const [updateInitialMessagesOfSingleConversationGroupId, setUpdateInitialMessagesOfSingleConversationGroupId] = useState(()=>{
      return "";
   })




   return (
      <FetchingMessagesContext.Provider value={{
      selectedContactGroupForToFetchingItsMessage,
      setSelectedContactGroupForToFetchingItsMessage,

      singleConversationInitialMessage,
      setSingleConversationInitialMessage,

      updateInitialMessagesOfSingleConversationGroupId,
      setUpdateInitialMessagesOfSingleConversationGroupId

      }}>

      {props.children}
      </FetchingMessagesContext.Provider>
   )
}

export { FetchingMessagesContextProvider };
export default FetchingMessagesContext;