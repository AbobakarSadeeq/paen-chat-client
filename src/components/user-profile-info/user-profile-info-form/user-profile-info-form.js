import { useFormik } from "formik";
import React from "react";
import UserProfileFormCss from "./user-profile-info-form.module.css";
import * as Yup from "yup";

const UserProfileInfoForm = ({ userFormDataObj }) => {
  const userProfileFormik = useFormik({
    initialValues: {
      userName: userFormDataObj.userName,
      aboutStatus: userFormDataObj.aboutStatus,
      profilePhotoUrl: userFormDataObj.profilePhotoUrl,
    },
    validationSchema: Yup.object({}),
    onSubmit: (value, { resetForm }) => {
      console.log(value);
    },
  });

  return (
    <>
      <h3 className={UserProfileFormCss["main-form-header"]}>
        Your Profile Detail
      </h3>

      <div className={UserProfileFormCss["profile-form"]}>
        <form onSubmit={userProfileFormik.handleSubmit}>
          <input
            type="text"
            onBlur={userProfileFormik.handleBlur}
            value={userProfileFormik.values.userName}
            onChange={userProfileFormik.handleChange}
            className={UserProfileFormCss["input"]}
            placeholder="Your Full Name "
            name="userName"
          />{" "}
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
          />{" "}
          <br />
          <br />
          {/* Do the about tommarow INSHALLAH */}
          {/* <input
            type="file"
            onBlur={userProfileFormik.handleBlur}
            value={userProfileFormik.values.aboutStatus}
            onChange={userProfileFormik.handleChange}
            className={UserProfileFormCss["file-input"]}
            name="aboutStatus"
          /> */}
          <button type="submit" className={UserProfileFormCss.changeProfile}>
            Change profile
          </button>
        </form>
      </div>
    </>
  );
};

export default UserProfileInfoForm;
