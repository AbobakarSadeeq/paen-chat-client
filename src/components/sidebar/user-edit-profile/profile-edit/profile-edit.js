import { Dialog } from "primereact/dialog";
import React from "react";
import ProfileEditCss from "./profile-edit.module.css";
import ByDefaultUserImage from "../../../../assest/No Image.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ProfileEdit = ({ hideDialog, userFormDataObj }) => {
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

  function hideDialogOfModel() {
    hideDialog(false);
  }

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
         hideDialog(false);
        });
    },
  });

  return (
    <>
      <Dialog
        header="Edit Profile"
        visible={true}
        style={{ width: "20vw" }}
        onHide={hideDialogOfModel}
        className={ProfileEditCss["profile-edit-model"]}
        contentStyle={{ backgroundColor: "#2c3638", cursor:'auto' }}
        headerStyle={{ backgroundColor: "#2c3638", color: "#8a98ac", cursor:'auto' }}
      >
        <form onSubmit={userProfileFormik.handleSubmit} className={ProfileEditCss['editForm']}>
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
                className={ProfileEditCss["adding-profile-img"]}
              />{" "}
              <br />
              <br />
              <input
                type="file"
                onChange={fileChange}
                className={ProfileEditCss["file-input"]}
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
            className={ProfileEditCss["input"]}
            placeholder="Your Full Name "
            name="userName"
          />
          {userProfileFormik.touched.userName &&
          userProfileFormik.errors.userName ? (
            <div className={ProfileEditCss["validation-error"]}>
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
            className={ProfileEditCss["input"]}
            placeholder="About "
            name="aboutStatus"
          />
          {userProfileFormik.touched.aboutStatus &&
          userProfileFormik.errors.aboutStatus ? (
            <div className={ProfileEditCss["validation-error"]}>
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
                ? ProfileEditCss.changeProfileDisabled
                : ProfileEditCss.changeProfile
            }
          >
            Change profile
          </button>
        </form>
      </Dialog>
    </>
  );
};

export default ProfileEdit;
