import { createBrowserHistory } from "history";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import LoggedInContext from "../../context/loggedIn/loggedIn";
import homeCss from "./home.module.css";
const Home = () => {
  useEffect(() => {
    var serverDate = new Date("2023-02-09 18:47:00.0000000");
    // console.log(serverDate.toLocaleDateString("en-US"));
    // console.log(serverDate.toLocaleTimeString("en-US"));

  }, []);





  return (
    <>
      <div className={homeCss["main-home"]}>
        <div className={homeCss["home-info"]}>
          <img src={require("../../assest/home/home picture.PNG")} alt="" />
          <p className={homeCss["main-heading"]}>PaenChat Web</p>
          <br />
          <p>
            Now you can send and receive messages without any kind of mobile
            device online.
          </p>
          <p>
            You can send messages, pictuers, videos, and much more with your
            friends.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;

