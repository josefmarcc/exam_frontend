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
          <h4>Welcome {user.username}, Here is your booking history</h4>
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
              {bookedHotel && bookedHotel.length > 0 ? (
                bookedHotel.map((m) => (
                  <tr key={m.hotel}>
                    <td>{m.hotel}</td>
                    <td>{m.days}</td>
                    <td>{m.price}</td>
                    <td>{m.startDate}</td>
                  </tr>
                ))
              ) : (
                <p>No user bookings</p>
              )}
            </tbody>
          </table>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}
