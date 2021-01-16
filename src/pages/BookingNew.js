import React, { useState, useEffect } from "react";
import apiFacade from "../api/apiFacade";
import SERVER_URL from "../util/Settings";
import "bootstrap/dist/css/bootstrap.css";
import BookingModal from "../components/BookingModal";

export default function BookingNew() {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [q, setQ] = useState("");

  const fetchHotels = () => {
    return fetch(SERVER_URL + "hotels")
      .then((response) => response.json())
      .then((data) => {
        setDataFromServer(data);
        setFilteredData(data);
        console.log("1. fetch" + dataFromServer);
      });
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const filtered = (e) => {
    const filtered =
      dataFromServer &&
      dataFromServer.filter((item) => {
        return item.title.toLowerCase().startsWith(e.toLowerCase());
      });
    setFilteredData(filtered);
  };

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="text-center mt-5 mb-2">Hotel</h2>
          <p className="text-muted">Search for a hotel</p>

          <div class="input-group rounded mb-5 mt-2">
            <input
              type="search"
              className="form-control rounded text-center"
              placeholder="Search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                filtered(e.target.value);
              }}
            />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Hotel:</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Url</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0
                ? filteredData.map((m) => (
                    <tr key={m.id}>
                      <td>{m.title}</td>
                      <td>{m.address}</td>
                      <td>{m.email}</td>
                      <td>{m.url}</td>
                      <BookingModal />
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
