import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const Booking = () => {
  const [serverData, setServerData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);

  async function getRooms() {
    try {
      const response = await fetch("http://localhost:5000/room", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        setServerData(data.rooms);
      } else {
        alert("Error" + response);
        console.log(response);
      }
    } catch (error) {}
  }

  async function handlePayment(type) {
    let id = 0;
    if (type === "Standard") {
      id = 1;
    } else if (type === "Deluxe") {
      id = 2;
    } else if (type === "Executive") {
      id = 3;
    } else if (type === "Business_Suite") {
      id = 4;
    } else if (type === "Deluxe_Suite") {
      id = 5;
    } else {
      alert("Error Finding Room Type");
      window.location.href = "/booking";
    }
    console.log(type);
    console.log(id);

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const difference = checkOutDate.getTime() - checkInDate.getTime();
    const numberOfNights = difference / (1000 * 60 * 60 * 24);
    console.log(checkIn);
    console.log(numberOfNights);

    try {
      const response = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          quantity: numberOfNights,
          checkIn: checkIn,
          checkOut: checkOut,
        }),
      });

      const data = await response.json();
      if (data) {
        console.log(data);
        window.location.href = data.url;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function getImage(index) {
    if (serverData[index].type === "Standard") {
      return `${process.env.PUBLIC_URL}/images/standard-room.jpg`;
    } else if (serverData[index].type === "Deluxe") {
      return `${process.env.PUBLIC_URL}/images/deluxe-room.jpg`;
    }
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <Sidebar
        icon1="fa-solid fa-home"
        link1="Dashboard"
        path1="/dashboard"
        icon2="fa-solid fa-user"
        link2="Profile"
        path2="/profile"
        icon3="fa-solid fa-book text-white active"
        link3="Booking"
        path3="/booking"
      />
      <section id="booking">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-3 shadow mb-3">
              <h4>Booking</h4>
            </div>
            <div className="col-12 p-3 mb-3">
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-primary d-flex">
                  <i class="fa-solid fa-magnifying-glass me-2 my-auto"></i>
                  Search
                </button>
              </form>
            </div>
            <div className="col-12 p-3">
              {serverData && serverData.length > 0 ? (
                serverData.map((room, index) => (
                  <div key={index} className="row mb-3">
                    <div className="col-12 d-flex">
                      <div className="col-6 text-center my-auto">
                        <h2 className="text-primary fw-bold">{room.type}</h2>
                        <h4 className="text-black fw-normal">
                          Room Number: {room.number}
                        </h4>
                        <h4 className="text-black fw-normal">
                          Availability:{" "}
                          {room.availability ? "Available" : "Not Available"}
                        </h4>
                        <div className="d-flex justify-content-center align-items-center mt-5">
                          <h4 className="text-black fw-normal my-auto me-3">
                            {" "}
                            Price: Rs {room.price}
                          </h4>
                          <button
                            onClick={toggleModal}
                            className="btn btn-primary"
                          >
                            <i class="fa-solid fa-file-pen me-2"></i>Book
                          </button>
                          <Modal show={showModal} onHide={toggleModal} centered>
                            <Modal.Header closeButton>
                              <Modal.Title>Booking: {room.type}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form>
                                <div className="col-12">
                                  <p>{room.type}</p>
                                </div>
                                <div className="col-12 d-flex mb-3">
                                  <div className="col-6 me-2">
                                    <label
                                      htmlFor="adults"
                                      className="form-label"
                                    >
                                      No. of Adults
                                    </label>
                                    <input
                                      type="number"
                                      id="adults"
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label
                                      htmlFor="child"
                                      className="form-label"
                                    >
                                      No. of Child
                                    </label>
                                    <input
                                      type="number"
                                      id="child"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-12 d-flex mb-3">
                                  <div className="col-6 me-2">
                                    <label
                                      htmlFor="checkIn"
                                      className="form-label"
                                    >
                                      Check In Date
                                    </label>
                                    <input
                                      type="date"
                                      id="checkIn"
                                      value={checkIn}
                                      onChange={(e) =>
                                        setCheckIn(e.target.value)
                                      }
                                      className="form-control"
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label
                                      htmlFor="checkOut"
                                      className="form-label"
                                    >
                                      Check Out Date
                                    </label>
                                    <input
                                      type="date"
                                      id="checkOut"
                                      value={checkOut}
                                      onChange={(e) =>
                                        setCheckOut(e.target.value)
                                      }
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                                <div className="col-12 my-auto">
                                  <p className="fs-4">
                                    <span className="fw-bold">Price:</span> Rs.{" "}
                                    {room.price}
                                  </p>
                                </div>
                              </form>
                            </Modal.Body>
                            <Modal.Footer className="modal-footer">
                              <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={() => {
                                  handlePayment(room.type);
                                }}
                              >
                                <i class="fa-solid fa-receipt me-2"></i>Payment
                              </button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                      <div className="col-6 text-end">
                        <img src={getImage(index)} alt="Room" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Data Found</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
