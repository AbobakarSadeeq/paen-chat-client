import React from "react";
import AuthForm from "./auth-form/auth-form";
import AuthCss from "./auth.module.css";
const Auth = () => {
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
            <AuthForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
