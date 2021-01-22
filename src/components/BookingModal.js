import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import facade from "../api/userFacade";
import apiFacade from "../api/apiFacade";

function BookingModal({ selectedHotel, daysBooking, startDate, user }) {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectedHotelBooking = {
    startDate: startDate,
    days: parseInt(daysBooking),
    price: parseFloat(selectedHotel.price),
    hotel: selectedHotel.name,
    userName: user.username,
  };

  const addBooking = (evt) => {
    evt.preventDefault();
    apiFacade.addBooking(selectedHotelBooking);
    handleClose();
  };

  return (
    <>
      <div>
        <p className="mt-2">Click here to book!</p>
        <Button variant="primary" onClick={handleShow}>
          Book
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedHotel.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <p>{selectedHotel.content}</p>
              <p>Start date of stay - {startDate.toLocaleDateString()}</p>
              <p>Duration of stay - {daysBooking}</p>
              <p>Hotels Email - {selectedHotel.email}</p>
              <p>Hotel price pr day - {selectedHotel.price}</p>
              <p>User - {user.username}</p>
              <br />
              <input className="mb-2" placeholder="Password" id="password" />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addBooking}>
            Make booking!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingModal;
