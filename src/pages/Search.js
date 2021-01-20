import apiFacade from "../api/apiFacade";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Marker } from "react-geo-maps";
import Calender from "../components/Calender";

export default function Home() {
  const init = [{ title: "" }];
  const initLocations = [{ lat: 28.7041, lng: 77.1025, title: "Delhi" }];
  const [hotelID, setHotelID] = useState("4042");
  const [hotelInfo, setHotelInfo] = useState(init);
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
  const [locations, setLocations] = useState(initLocations);

  const fetchData = () => {
    apiFacade.getHotels().then((data) => setHotelInfo(data));
  };

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
                <th scope="col">Title</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Email </th>
              </tr>
            </thead>
            <tbody>
              <tr key={selectedHotel.id}>
                <td>{selectedHotel.title}</td>
                <td>{selectedHotel.address}</td>
                <td>{selectedHotel.phone}</td>
                <td>{selectedHotel.email}</td>
              </tr>
            </tbody>
          </table>
          <div>{selectedHotel.content}</div>

          <div class="mt-5">
            <Marker
              apikey="AIzaSyCh68T1_ltWVPCakvrpPIth7bhVE-nNW3Y"
              zoom={2}
              center={{ lat: -28.024, lng: 140.887 }}
              locations={locations}
              height={350}
              width={750}
            />
          </div>
          <Calender />
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}
