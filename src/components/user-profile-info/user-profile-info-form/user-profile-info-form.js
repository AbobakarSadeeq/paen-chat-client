import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";

import UserProfileFormCss from "./user-profile-info-form.module.css";
import * as Yup from "yup";
import ByDefaultUserImage from "../../../assest/No Image.jpg";
import axios from "axios";
import LoggedInContext from "../../../context/loggedIn/loggedIn";

const UserProfileInfoForm = ({ userFormDataObj }) => {
  const authContextApi = useContext(LoggedInContext);

  const [selectedFile, setSelectedFile] = useState(() => {
    return null;
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    let objectUrl = null;
    if (selectedFile != null) {
      let objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  function fileChange(event) {
    setSelectedFile(() => {
      return event.target.files[0];
    });
  }

  const userProfileFormik = useFormik({
    initialValues: {
      userName: userFormDataObj.userName,
      aboutStatus: userFormDataObj.aboutStatus,
      profilePhotoUrl: userFormDataObj.profilePhotoUrl,
    },

    validationSchema: Yup.object({
      userName: Yup.string().required("Please write your name"),
      aboutStatus: Yup.string().required("Please write your about status"),
    }),
    onSubmit: (value, { resetForm }) => {
      const formFrom = new FormData();
      formFrom.append("userName", value.userName);
      formFrom.append("aboutStatus", value.aboutStatus);
      formFrom.append(
        "userId",
        JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1]))
          .UserId
      );
      if (selectedFile != null) {
        // if file is selected
        formFrom.append("File", selectedFile, selectedFile.name);
      } else {
      }

      axios
        .put(
          "https://localhost:44389/api/Account/AddingUserProfileData",
          formFrom
        )
        .then((responseData) => {
          console.log("done adding");

          // next step here
          let updateView = JSON.parse(localStorage.getItem("Token"));
          if (updateView.ProfileAddValid == false) {
            localStorage.setItem(
              "Token",
              JSON.stringify({
                Token: updateView.Token,
                ProfileAddValid: true,
              })
            );
          }
          authContextApi.isLoggedIn(true);
        });
    },
  });
  console.log(userFormDataObj);
  return (
    <>
      <h3 className={UserProfileFormCss["main-form-header"]}>
        Your Profile Detail
      </h3>

      <div className={UserProfileFormCss["profile-form"]}>
        <form onSubmit={userProfileFormik.handleSubmit}>
          {
            <>
              <img
                src={
                  preview == null
                    ? userFormDataObj.profilePhotoUrl
                      ? userFormDataObj.profilePhotoUrl
                      : ByDefaultUserImage
                    : preview
                }
                width="100px"
                height="100px"
                alt=""
                className={UserProfileFormCss["adding-profile-img"]}
              />{" "}
              <br />
              <br />
              <input
                type="file"
                onChange={fileChange}
                className={UserProfileFormCss["file-input"]}
                name="File"
                id="upload"
                hidden
              />
              <label htmlFor="upload" onChange={fileChange}>
                Choose file
              </label>
            </>
          }
          <br />
          <br />
          <input
            type="text"
            onBlur={userProfileFormik.handleBlur}
            value={userProfileFormik.values.userName}
            onChange={userProfileFormik.handleChange}
            className={UserProfileFormCss["input"]}
            placeholder="Your Full Name "
            name="userName"
          />
          {userProfileFormik.touched.userName &&
          userProfileFormik.errors.userName ? (
            <div className={UserProfileFormCss["validation-error"]}>
              {userProfileFormik.errors.userName}
            </div>
          ) : null}
          <br />
          <br />
          <input
            type="text"
            onBlur={userProfileFormik.handleBlur}
            value={userProfileFormik.values.aboutStatus}
            onChange={userProfileFormik.handleChange}
            className={UserProfileFormCss["input"]}
            placeholder="About "
            name="aboutStatus"
          />
          {userProfileFormik.touched.aboutStatus &&
          userProfileFormik.errors.aboutStatus ? (
            <div className={UserProfileFormCss["validation-error"]}>
              {userProfileFormik.errors.aboutStatus}
            </div>
          ) : null}
          <br />
          <br />
          <button
            type="submit"
            disabled={
              (!(userProfileFormik.isValid && userProfileFormik.dirty) &&
                userProfileFormik.values.userName.length == 0) ||
              userProfileFormik.values.aboutStatus.length == 0
            }
            className={
              (!(userProfileFormik.isValid && userProfileFormik.dirty) &&
                userProfileFormik.values.userName.length == 0) ||
              userProfileFormik.values.aboutStatus.length == 0
                ? UserProfileFormCss.changeProfileDisabled
                : UserProfileFormCss.changeProfile
            }
          >
            Change profile
          </button>
        </form>
      </div>
    </>
  );
};

export default UserProfileInfoForm;
