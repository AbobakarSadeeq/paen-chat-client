import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import AuthFormCss from "./auth-form.module.css";
const AuthForm = () => {
  const [verificationCode, setVerificationCode] = useState(() => {
    return false;
  });

  const [
    resetVerficationCodeCountDownSec,
    setResetVerficationCodeCountDownSec,
  ] = useState(() => {
    return 59;
  });

  const [
    resetVerficationCodeCountDownMint,
    setResetVerficationCodeCountDownMint,
  ] = useState(() => {
    return 2;
  });

  let countDownInterval = useRef(null);

  useEffect(() => {
    if (
      resetVerficationCodeCountDownMint == 0 &&
      resetVerficationCodeCountDownSec == 0
    ) {
      clearInterval(countDownInterval.current);
    }

    if (resetVerficationCodeCountDownSec == 59) {
      if (resetVerficationCodeCountDownMint >= 1) {
        setResetVerficationCodeCountDownMint((pervsValue) => {
          return pervsValue - 1;
        });
      }
    }
  }, [resetVerficationCodeCountDownSec]);

  const formik = useFormik({
    initialValues: {
      email: "",
      verificationCode: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9](\.?[a-zA-Z0-9]){1,}@gmail\.com$/,
          "Only allow gmail accounts"
        )
        .email("Invalid email format")
        .required("Please write the email"),

      verificationCode: Yup.string()
        .matches(/^\d*[1-9]\d*$/, "only numbers is allowed")
        .required("Please write the sended code"),
    }),
    onSubmit: (value, { resetForm }) => {
      axios
        .post("https://localhost:44389/api/Account/RandomCodeVerification", {
          email: value.email,
          enteredVerificationPassword: value.verificationCode,
        })
        .then((responseData) => {
          localStorage.setItem("Token", responseData.data);
        });
      resetForm();
    },
  });

  const emailInputValidHandler = (validateValue) => {
    if (validateValue) {
      // send request to server about to check the email.
      setVerificationCode(true);
      axios
        .post("https://localhost:44389/api/Account", {
          email: formik.values.email,
        })
        .then((responseData) => {});
    }

    countDownInterval.current = setInterval(() => {
      setResetVerficationCodeCountDownSec((pervsValue) => {
        if (pervsValue == 0) {
          return 59;
        }
        return pervsValue - 1;
      });
    }, 1000);
  };

  return (
    <>
      {verificationCode ? (
        <>
          <p>Please verify the code which sended to your gmail</p>
          <p>
            {"0" + resetVerficationCodeCountDownMint}:
            {resetVerficationCodeCountDownSec < 10
              ? "0" + resetVerficationCodeCountDownSec
              : resetVerficationCodeCountDownSec}
          </p>
        </>
      ) : (
        <p>Log In !</p>
      )}

      <form onSubmit={formik.handleSubmit}>
        {verificationCode == true ? (
          <>
            <input
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.verificationCode}
              onChange={formik.handleChange}
              className={AuthFormCss["input"]}
              placeholder="verification code"
              name="verificationCode"
            />
            {formik.touched.verificationCode &&
            formik.errors.verificationCode ? (
              <div className={AuthFormCss["validation-error"]}>
                {formik.errors.verificationCode}
              </div>
            ) : null}
          </>
        ) : (
          <>
            <input
              type="email"
              onBlur={formik.handleBlur}
              value={formik.values.email}
              onChange={formik.handleChange}
              className={AuthFormCss["input"]}
              placeholder="Email"
              name="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={AuthFormCss["validation-error"]}>
                {formik.errors.email}
              </div>
            ) : null}
          </>
        )}

        <div style={{ backgroundColor: "#2c3638" }}>
          <br />

          {verificationCode ? (
            <button
              disabled={!(formik.isValid && formik.dirty)} // it will be enable when all inputs is valid
              type="submit"
              className={
                !(formik.isValid && formik.dirty)
                  ? AuthFormCss.logInBtndisabled
                  : AuthFormCss.logInBtn
              }
            >
              Check code
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                emailInputValidHandler(
                  formik.values.email.includes("@gmail.com")
                )
              }
              className={AuthFormCss.logInBtn}
            >
              Send code
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default AuthForm;
