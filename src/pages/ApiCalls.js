import apiFacade from "../api/apiFacade";
import React, { useState, useEffect } from "react";

export default function Jokes({isLoggedIn}) {
  const [dataFromServer, setDataFromServer] = useState("Waiting...");
  const [dataFromServer1, setDataFromServer1] = useState("Waiting...");

  useEffect(() => {
    apiFacade.getJokes().then((data) => setDataFromServer(data));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    apiFacade.getQuote().then((data) => setDataFromServer1(data));
  };

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="text-center mt-5 mb-2">Api Calls(On load)</h2>
          <p className="text-center">{dataFromServer.chuckValue}</p>
          <p className="text-center">{dataFromServer.dadValue}</p>
          <p className="text-center">{dataFromServer.insult}</p>
          <h2 className="text-center mt-5 mb-2">Api Calls(On Click)</h2>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Load quotes</button>
          <p className="text-center mt-2">{dataFromServer1.friendsChar}</p>
          <p className="text-center">{dataFromServer1.friendsQuote}</p>
          {isLoggedIn && (
            <div className="mt-5">
              <p>*******************</p>
              <h4>Only visable if logged in</h4>
              <p>Add custom features for users</p>
              <p>*******************</p>
              </div>
          )}
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
