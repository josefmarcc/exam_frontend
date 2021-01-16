import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import facade from "../api/apiFacade";

function BookingModal() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const init = { username: "", hotel: "", days: 0, price: 0 };
  const [newCredentials, setNewCredentials] = useState(init);

  const makeBooking = (evt) => {
    evt.preventDefault();
    facade.makeBooking(
      newCredentials.username,
      newCredentials.hotel,
      newCredentials.days,
      newCredentials.price
    );
    handleClose();
  };
  const onChange = (evt) => {
    setNewCredentials({
      ...newCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Make Booking
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onChange={onChange}>
              <input className="mb-2" placeholder="User Name" id="username" />
              <br />
              <input className="mb-2" placeholder="hotel" id="hotel" />
              <br />
              <input className="mb-2" placeholder="days" id="days" />
              <br />
              <input className="mb-2" placeholder="price" id="price" />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={makeBooking}>
            Make booking
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingModal;
