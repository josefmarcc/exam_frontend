import apiFacade from "../api/apiFacade";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Marker } from "react-geo-maps";
import BookingModal from "../components/BookingModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CreateModal from "../components/RegisterUser";

export default function Home({ isLoggedIn, user }) {
  // init data for hotel
  const init = [{ title: "" }];

  // Init locations for the map
  const initLocations = [{ lat: 28.7041, lng: 77.1025, title: "Delhi" }];

  // Set hotel ID to fetch the specific hotel
  const [hotelID, setHotelID] = useState("4042");

  // hotelInfo for looping though in search
  const [hotelInfo, setHotelInfo] = useState(init);

  // selected hotel in the searchbar
  const [selectedHotel, setSelectedHotel] = useState({
    id: "",
    title: "",
    content: "",
    address: "",
    phone: "",
    price: "",
    directions: "",
    email: "",
    url: "",
    geo: [""],
  });

  // locaitons on map for hotels
  const [locations, setLocations] = useState(initLocations);

  // DatePicker state and onChangeHandler.
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChangeDatePicker = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [daysBooking, setDaysBooking] = useState(0);

  const fetchData = () => {
    apiFacade.getHotels().then((data) => setHotelInfo(data));
  };

  // useEffect to only render when endDate is changed.
  useEffect(() => {
    if (endDate != null && startDate != null) {
      // To calculate the time difference of two dates
      let Difference_In_Time = endDate.getTime() - startDate.getTime();
      // To calculate the no. of days between two dates
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      setDaysBooking(Difference_In_Days);
      console.log(Difference_In_Days);
    }
  }, [endDate]);

  useEffect(() => {
    fetchData();
  }, []);

  const options = hotelInfo.map((item) => {
    return {
      value: item.id,
      label: item.title,
    };
  });

  const fetchHotelByID = (id) => {
    apiFacade.getHotelByID(id).then((data) => setSelectedHotel(data));
  };

  const onChange = (evt) => {
    setHotelID(evt.value);
    setLocations([
      {
        lat: parseFloat(selectedHotel.geo.lat),
        lng: parseFloat(selectedHotel.geo.lon),
        title: selectedHotel.title,
      },
    ]);
    console.log(selectedHotel);
    console.log(hotelID);
  };

  useEffect(() => {
    fetchHotelByID(hotelID);
  }, [hotelID]);

  // TODO fix Marker til at opdatere når man ændre location.
  return (
    <div className="container-fluid padding">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-center">
          <h2 className="mt-5">Hotel list</h2>
          <h3>Search for hotels</h3>
          <Select
            options={options}
            isSearchable
            placeholder="Search for hotel"
            onChange={onChange}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Hotel</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Email </th>
              </tr>
            </thead>
            <tbody>
              <tr key={selectedHotel.id}>
                <td>{selectedHotel.name}</td>
                <td>{selectedHotel.address}</td>
                <td>{selectedHotel.phone}</td>
                <td>{selectedHotel.email}</td>
              </tr>
            </tbody>
          </table>
          <div>{selectedHotel.content}</div>
          <div className="mt-3">
            <h3>Book now!</h3>
            <DatePicker
              selected={startDate}
              onChange={onChangeDatePicker}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
            {isLoggedIn ? (
              <BookingModal
                selectedHotel={selectedHotel}
                startDate={startDate}
                daysBooking={daysBooking}
                user={user}
              />
            ) : (
              <div>
                <p>Please register to start your booking</p>
                <CreateModal />
              </div>
            )}
          </div>
          <div className="mt-5">
            <Marker
              apikey="AIzaSyCh68T1_ltWVPCakvrpPIth7bhVE-nNW3Y"
              zoom={2}
              center={{ lat: -28.024, lng: 140.887 }}
              locations={locations}
              height={350}
              width={750}
            />
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
