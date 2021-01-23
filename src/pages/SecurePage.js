import React, { useState, useEffect } from "react";
import apiFacade from "../api/apiFacade";

export default function SecurePage({ user }) {
  const [bookedHotel, setBookedHotel] = useState({
    startDate: "",
    days: 0,
    price: 0,
    hotel: "",
    userName: "",
  });

  const fetchData = () => {
    apiFacade
      .getUserBookings(user.username)
      .then((data) => setBookedHotel(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">Secure page</h2>
          <h4>Welcome {bookedHotel.userName}, Here is your booking history</h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Hotel</th>
                <th scope="col">Days</th>
                <th scope="col">Price</th>
                <th scope="col">Start Date</th>
              </tr>
            </thead>
            <tbody>
              <tr key={bookedHotel.userName}>
                <td>{bookedHotel.hotel}</td>
                <td>{bookedHotel.days}</td>
                <td>{bookedHotel.price}</td>
                <td>{bookedHotel.startDate}</td>
              </tr>
            </tbody>
          </table>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
