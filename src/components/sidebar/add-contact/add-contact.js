import React, { useState } from "react";
import addContactCss from "./add-contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import UserChat from "../user-chat/user-chat";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import LoggedInContext from "../../../context/loggedIn/loggedIn";
import ContactContext from "../../../context/contact-context/contact-context";
import { signalRConnectionSingletonObj } from "../../Auth/auth";

const AddContact = (props) => {
  const contactContextApi = useContext(ContactContext);

  const contextApi = useContext(LoggedInContext);

  const [contactList, setContactList] = useState(() => {
    return [...props.allContactList];
  });

  const [selectedIndex, setSelectedIndex] = useState(() => {
    return 0;
  });

  if (props.refreshContectProp) {
    axios
      .get(
        "https://localhost:44389/api/Contact/" +
          JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1]))
            .UserId
      )
      .then((responseData) => {

        let customArr = [...responseData.data];
        customArr = customArr.map((obj) => ({
          ...obj,
          selectedContectStyle: false,
        }));
        setContactList(customArr);
      });
  }

  useEffect(() => {

        // live blocking updating array and who block it will execute this below code here
        if(contactContextApi.contactBlockUpdating !== null) {

          setContactList((prevsContacts)=>{
            let findingContactIndex = prevsContacts.findIndex(a=>a.contactId === contactContextApi.contactBlockUpdating.contactId);
            prevsContacts[findingContactIndex].blockContact = !prevsContacts[findingContactIndex].blockContact;
            return [...prevsContacts];
          });
          contactContextApi.setContactBlockUpdating(null);
        }




    if (Object.keys(contactContextApi.addNewContact).length != 0) {
      let contactArr = [...contactList];
      contactArr.push(contactContextApi.addNewContact.userAddedContactDetail);

      setContactList((prevs) => {
        return contactArr;
      });

      let updateContacts = {
        ...contactContextApi.addNewContact.userAddedContactDetail

      }


      props.updateContactListForAddNewContact(updateContacts);



      // calling server for to call other user notify that new user added.
      const storingLiveContactInOtherUserId = contactContextApi.addNewContact.userAddedContactDetail.userId;
      let receiverUserContact = {
        ...contactContextApi.addNewContact.userWantsToConnectItselfDetail,
        };
      signalRConnectionSingletonObj
      .invoke("NewContactAddedLive", storingLiveContactInOtherUserId, receiverUserContact )
      .then(()=>{

      });

      contactContextApi.setAddNewContact({});



    }

    // axios
    //   .get(
    //     "https://localhost:44389/api/Contact/" +
    //       JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1]))
    //         .UserId
    //   )
    //   .then((responseData) => {
    //     let customArr = [...responseData.data];
    //     customArr = customArr.map((obj) => ({
    //       ...obj,
    //       selectedContectStyle: false,
    //     }));
    //     setContactList(customArr);
    //   });
  }, [contactContextApi.addNewContact, contactContextApi.contactBlockUpdating]);

  function openModelHandler() {
    props.openAddContactDialog(true);
  }

  function changeSelectedContactEffect(i) {
    let fetchArrData = [contactList];
    setSelectedIndex(i);
    // fetchArrData[selectedIndex].selectedContectStyle = false;
    // fetchArrData[i].selectedContectStyle = true;
    // setContactList(() => {
    //   return fetchArrData;
    // });
  }


  return (
    <div>
      <>
        <div className={addContactCss["add-contact-section"]}>
          <button onClick={openModelHandler}>
            Add Contact &nbsp;
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </div>

        <div className={addContactCss["users-section"]}>
          {contactList.length > 0 &&
            contactList.map((singleContact, index) => {
              return (
                <div key={index}>
                  <UserChat
                    showChatSection={props.showChatSection}
                    index={index}
                    showAddContactPanel={props.showAddContactPanelDataObj}
                    AddContactData={singleContact}
                    changeSelectedContactEffect={changeSelectedContactEffect}
                  />
                </div>
              );
            })}
        </div>
      </>
    </div>
  );
};

export default AddContact;
