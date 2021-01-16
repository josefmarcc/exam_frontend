import apiFacade from "../api/apiFacade";
import React, { useState, useEffect } from "react";
import SERVER_URL from "../util/Settings";

export default function Jokes({ isLoggedIn }) {
  const [dataFromServer, setDataFromServer] = useState("Waiting...");
  const [dataFromServer1, setDataFromServer1] = useState("Waiting...");

  // useEffect(() => {
  //   apiFacade.getHotels().then((data) => setDataFromServer(data));
  // }, []);

  const handleClick = (e) => {
    e.preventDefault();
    apiFacade.getQuote().then((data) => setDataFromServer1(data));
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const data = await fetch(SERVER_URL);
    const hotels = await data.json();
    console.log(hotels);
    let test = hotels.map((el) => el.title);
    setDataFromServer(test);
    console.log(test);
  };

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="text-center mt-5 mb-2">Api Calls(On load)</h2>
          <p className="text-center">{dataFromServer}</p>
          <h2 className="text-center mt-5 mb-2">Api Calls(On Click)</h2>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Load quotes
          </button>
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
