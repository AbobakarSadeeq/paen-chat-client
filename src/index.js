import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import LoggedInContext from "./context/loggedIn/loggedIn";
import ResponseErrorHandling from "./components/response-error-handling/response-error-handling";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);

axios.interceptors.request.use(
  (requestConfig) => {
    let token = JSON.parse(localStorage.getItem("Token"));
    if (token != null) {
      // adding attribute or meta-data to headers
      requestConfig.headers["Authorization"] = "Bearer " + token.Token;
    }
    // if null then it means does not apply for authentication and authorization and show simple view

    return requestConfig; // means true and send the request
  },
  (error) => {
    // when we sendding something wrong
    debugger;
  }

  // response
);

axios.interceptors.response.use(
  (responseConfig) => {
    // response is not having a error
    return responseConfig;
  },
  (responseError) => {
    // response is  having a error

    localStorage.removeItem("Token");
    root.render(
      <BrowserRouter basename="/">
        <ResponseErrorHandling statusCode={responseError.response.status} />
      </BrowserRouter>
    );
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
