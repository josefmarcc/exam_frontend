import React, { useState, useEffect } from "react";
import apiFacade from "../api/apiFacade";
import userFacade from "../api/userFacade";
import Select from "react-select";

export default function AdminPage() {
  const [userBookings, setUserBookings] = useState([
    {
      startDate: "",
      days: 0,
      price: 0,
      hotel: "",
      userName: "",
    },
  ]);

  const init = [{ userName: "" }];

  const [userList, setUserList] = useState(init);

  // for fetchUserBooking onChange
  const [userName, setUserName] = useState("testperson");

  const fetchData = () => {
    userFacade.fetchUserList().then((data) => setUserList(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // maps Users to the Select component
  const options = userList.map((item) => {
    return {
      value: item.userName,
      label: item.userName,
    };
  });

  const fetchUserBooking = (userName) => {
    apiFacade.getUserBookings(userName).then((data) => setUserBookings(data));
  };

  useEffect(() => {
    fetchUserBooking(userName);
  }, [userName]);

  const onChange = (evt) => {
    setUserName(evt.value);
    console.log(userName);
    console.log(userBookings);
  };

  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">Secure page</h2>
          <h4>User list</h4>
          <Select
            options={options}
            isSearchable
            placeholder="Search for a user"
            onChange={onChange}
          />
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
              {userBookings && userBookings.length > 0 ? (
                userBookings.map((m) => (
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
