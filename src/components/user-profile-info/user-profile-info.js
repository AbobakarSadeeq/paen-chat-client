import axios from "axios";
import React, { useEffect, useState } from "react";
import UserProfileInfoForm from "./user-profile-info-form/user-profile-info-form";
import ProfileCss from "./user-profile.info.module.css";

const UserProfileInfo = () => {
  const [userFormDetail, setUserFormDetail] = useState(() => {
    return {
      userName: null,
      aboutStatus: null,
      profilePhotoUrl: null,
    };
  });

  useEffect(() => {
    // fetching user all its data for form
    var payload = JSON.parse(
      window.atob(localStorage.getItem("Token").split(".")[1])
    );
    console.log(payload);
    var userId = payload.UserId;
    axios
      .get(
        "https://localhost:44389/api/Account/FetchingDataForFormUser/" + userId
      )
      .then((responseData) => {
        setUserFormDetail(() => {
          return {
            userName: responseData.data.userName == null && "",
            aboutStatus: responseData.data.aboutStatus == null && "",
            profilePhotoUrl: responseData.data.profilePhotoUrl == null && "",
          };
        });
      });
  }, []);

  return (
    <>
      {userFormDetail.userName == "" ? (
        <UserProfileInfoForm userFormDataObj={userFormDetail} />
      ) : null}
    </>
  );
};

export default UserProfileInfo;
