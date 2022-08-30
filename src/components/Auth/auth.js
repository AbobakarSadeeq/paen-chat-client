import React, { useEffect, useState } from "react";
import UserProfileInfo from "../user-profile-info/user-profile-info";
import AuthForm from "./auth-form/auth-form";
import AuthCss from "./auth.module.css";
const Auth = () => {
  const [userProfileFormForAuthorired, setUserProfileFormForAuthorired] =
    useState(() => {
      return false;
    });

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setUserProfileFormForAuthorired(true);
    }
  }, [userProfileFormForAuthorired]);

  return (
    <>
      <div className={AuthCss.main}>
        <div className={AuthCss["form-back"]}>
          <div className={AuthCss.logo}>
            <img
              src={require("../../assest/chat-logo/chat logo pic.PNG")}
              width="50px"
              height="50px"
              alt=""
            />
          </div>
          <br />

          <div className={AuthCss.formDiv}>
            <br />
            {userProfileFormForAuthorired ? (
              <UserProfileInfo />
            ) : (
              <AuthForm AuthenticatedUser={setUserProfileFormForAuthorired} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
