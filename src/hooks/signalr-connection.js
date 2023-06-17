import * as signalR from "@microsoft/signalr";
import { useState } from "react";

const useMakingSignalRConnection = () => {
  const makeTheSignalRConnectionOn = async () => {
    const loggedInUserId = (JSON.parse(window.atob(localStorage.getItem("Token").split(".")[1])).UserId);
      const singleRSingletonObject = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:44389/chathub?connectedId=${loggedInUserId}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();


    // connection must be start only once when you want to do the connect the user in list otherwise it will give u error
    // this below code is only used for to execute the signalR in backebd

    try {
      await singleRSingletonObject.start();
      return singleRSingletonObject;

    } catch (error) {
      console.log(error);
    }
  };

  return { makeTheSignalRConnectionOn };
};

export default useMakingSignalRConnection;
