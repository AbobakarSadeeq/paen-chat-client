import axios from "axios";

const useFetchSingleGroupMessages = () => {

   const singleGroupMessagesAsync = async (fetchingPositionData) => {

      try {
         const fetchingSingleGroupMessages = await axios.get("https://localhost:44389/api/Message", {params:fetchingPositionData});
         return fetchingSingleGroupMessages;
      }catch(error) {
         console.log(error);
      }


   }

   return {singleGroupMessagesAsync};
}

export default useFetchSingleGroupMessages;