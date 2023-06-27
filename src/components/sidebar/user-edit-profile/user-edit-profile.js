import {
  faAddressCard,
  faCamera,
  faEnvelope,
  faPhone,
  faUser,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import UserEditProfileCss from "./user-edit-profile.module.css";
import ByDefaultUserImage from "../../../assest/No Image.jpg";
import ProfileEdit from "./profile-edit/profile-edit";
import ContactContext from "../../../context/contact-context/contact-context";

const UserEditProfile = ({ showProfileDetail }) => {

  const contactContext = useContext(ContactContext);

  const [userDetail, setUserDetail] = useState(() => {
    return null;
  });

  const [openEditProfileDialog, setOpenEditProfileDialog] = useState(() => {
    return false;
  });

  useEffect(() => {
    if (openEditProfileDialog == false && userDetail == null) {
      axios
        .get(
          "https://localhost:44389/api/Account/FetchingDataForFormUser/" +
            JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1]))
              .UserId
        )
        .then((responseData) => {
          setUserDetail(responseData.data);
          console.log(responseData.data);
        });
    }
  }, [openEditProfileDialog]);

  function shareUpdatedUserProfileDataHandler(val) {


    setUserDetail((prevs) => {


      return {
        userName: val.userName,
        aboutStatus: val.aboutStatus,
        profilePhotoUrl: val.userProfilePictureUrl == null ? prevs.profilePhotoUrl : val.userProfilePictureUrl,
        email: prevs.email,
        contact: prevs.contact,
      };
    });



  }

  return (
    <div>
      {showProfileDetail == true ? (
        <>
          {userDetail ? (
            <>
              <div className={UserEditProfileCss["user-main-profile-picture"]}>
                <img
                  src={
                    userDetail.profilePhotoUrl
                      ? userDetail.profilePhotoUrl
                      : ByDefaultUserImage
                  }
                  alt=""
                />{" "}
                <br />
                <p>{userDetail.userName}</p>
                <button
                  onClick={() => {
                    setOpenEditProfileDialog(true);
                  }}
                >
                  Edit profile
                  <FontAwesomeIcon
                    icon={faUserPen}
                    className={UserEditProfileCss["camera-icon"]}
                  />
                </button>
              </div>
              <br />

              <div className={UserEditProfileCss["user-info-all-details"]}>
                <ul className={UserEditProfileCss["list-unstyled"]}>
                  <li className={UserEditProfileCss["media"]}>
                    <FontAwesomeIcon
                      icon={faUser}
                      className={UserEditProfileCss["user-icon"]}
                    />
                    <div className={UserEditProfileCss["media-body"]}>
                      <p className={UserEditProfileCss["header"]}>Username</p>
                      <p className={UserEditProfileCss["media-body-p"]}>
                        {userDetail.userName}
                      </p>
                    </div>
                  </li>
                  <li className={UserEditProfileCss["media"]}>
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className={UserEditProfileCss["user-icon"]}
                    />
                    <div className={UserEditProfileCss["media-body"]}>
                      <p className={UserEditProfileCss["header"]}>About</p>
                      <p className={UserEditProfileCss["media-body-p"]}>
                        {userDetail.aboutStatus}
                      </p>
                    </div>
                  </li>
                  <li className={UserEditProfileCss["media"]}>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className={UserEditProfileCss["user-icon"]}
                    />
                    <div className={UserEditProfileCss["media-body"]}>
                      <p className={UserEditProfileCss["header"]}>Email</p>
                      <p className={UserEditProfileCss["media-body-p"]}>
                        {userDetail.email}
                      </p>
                    </div>
                  </li>
                  <li className={UserEditProfileCss["media"]}>
                    <FontAwesomeIcon
                      icon={faPhone}
                      className={UserEditProfileCss["user-icon"]}
                    />
                    <div className={UserEditProfileCss["media-body"]}>
                      <p className={UserEditProfileCss["header"]}>
                        Contact Number
                      </p>
                      <p className={UserEditProfileCss["media-body-p"]}>
                        {userDetail.contact}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          ) : null}

          {openEditProfileDialog ? (
            <ProfileEdit
              hideDialog={setOpenEditProfileDialog}
              userFormDataObj={userDetail} //  need handler to call parent handler from the children handler
              fetchUpdatedUserProfileHandler={
                shareUpdatedUserProfileDataHandler
              }
            />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default UserEditProfile;
