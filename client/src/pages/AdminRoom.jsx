import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const AdminRoom = () => {
  const [serverData, setServerData] = useState([]);

  async function getRooms() {
    try {
      const response = await fetch("https://hotel-haven.onrender.com/room", {
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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <>
      <Sidebar
        icon1="fa-solid fa-home"
        link1="Dashboard"
        path1="/admin_dashboard"
        icon2="fa-solid fa-user"
        link2="Users"
        path2="/admin_user"
        icon3="fa-solid fa-bed text-white active"
        link3="Rooms"
        path3="/admin_room"
      />
      <section id="admin">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-3 shadow mb-3">
              <h4>All Rooms</h4>
            </div>
            <div className="col-12 p-3">
              {serverData && serverData.length > 0 ? (
                serverData.map((room, index) => (
                  <div key={index} className="row mb-3">
                    <div className="col-12 d-flex mb-3">
                      <div className="col-6 text-center my-auto">
                        <h2 className="text-primary fw-bold">{room.type}</h2>
                        <h4 className="text-black fw-normal">
                          Room Number: {room.number}
                        </h4>
                      </div>
                      <div className="col-6 text-center">
                        <h4 className="text-black fw-normal">
                          {room.available ? "Available" : "Not Available"}
                        </h4>
                        <h4 className="text-black fw-normal my-auto me-3">
                          {" "}
                          Price: Rs {room.price}
                        </h4>
                      </div>
                    </div>
                    <hr />
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

export default AdminRoom;
