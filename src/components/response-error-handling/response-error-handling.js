import React from "react";
import ResponseErrorHandlingCss from "./ResponseErrorHandling.module.css";
import { Link } from "react-router-dom";
const ResponseErrorHandling = (props) => {
  return (
    <>
      <div id={ResponseErrorHandlingCss["notfound"]}>
        <div className={ResponseErrorHandlingCss["notfound"]}>
          <div className={ResponseErrorHandlingCss["notfound-404"]}>
            <div></div>
            <h1>{props.statusCode}</h1>
          </div>
          {props.statusCode == 401 ? (
            <>
              <h1 className={ResponseErrorHandlingCss["main-header"]}>
                {props.statusCode} - Unauthorized
              </h1>
              <p className={ResponseErrorHandlingCss["error-msg-p"]}>
                Your authorization is failed.
              </p>
              <p className={ResponseErrorHandlingCss["error-msg-p"]}>
                Please try refreshing the page and fill in the correct login
                details.
              </p>
            </>
          ) : null}

          {props.statusCode == 403 ? (
            <>
              <h1 className={ResponseErrorHandlingCss["main-header"]}>
                {props.statusCode} - Forbidden
              </h1>
              <p className={ResponseErrorHandlingCss["error-msg-p"]}>
                Your authorization is failed.
              </p>
              <p className={ResponseErrorHandlingCss["error-msg-p"]}>
                You don't have permission to access on this screen.
              </p>
            </>
          ) : null}

          {props.statusCode == 404 ? (
            <>
              <h1 className={ResponseErrorHandlingCss["main-header"]}>
                {props.statusCode} - Not Found
              </h1>
              <p className={ResponseErrorHandlingCss["error-msg-p"]}>
                Your data is failed.
              </p>
              <p className={ResponseErrorHandlingCss["error-msg-p"]}>
                Sorry we cannot find your search data.
              </p>
            </>
          ) : null}
          <a href="/" className={ResponseErrorHandlingCss["abc"]}>
            home page
          </a>
        </div>
      </div>
    </>
  );
};

export default ResponseErrorHandling;
