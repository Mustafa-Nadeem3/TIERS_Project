import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const AdminUser = () => {
  const [serverData, setServerData] = useState([]);
  const userData = serverData.filter((data) => data.type === "user");

  async function getUsers() {
    try {
      const response = await fetch(
        "https://hotel-haven.onrender.com/user/all_users",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data) {
        setServerData(data.users);
      } else {
        alert("Error" + response);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Sidebar
        icon1="fa-solid fa-home"
        link1="Dashboard"
        path1="/admin_dashboard"
        icon2="fa-solid fa-user text-white active"
        link2="Users"
        path2="/admin_user"
        icon3="fa-solid fa-bed"
        link3="Rooms"
        path3="/admin_room"
      />
      <section id="admin">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-3 shadow mb-3">
              <h4>All Users</h4>
            </div>
            <div className="col-12 p-3">
              {userData && userData.length > 0 ? (
                userData.map((data, index) => (
                  <div key={index} className="row mb-3">
                    <div className="col-12 d-flex mb-3">
                      <div className="col-6 text-center my-auto">
                        <h2 className="text-primary fw-bold">{data.name}</h2>
                        <h4 className="text-black fw-normal">{data.email}
                        </h4>
                      </div>
                      <div className="col-6 text-center">
                        <h4 className="text-black fw-normal">
                          {data.address || "No Address Found"}
                        </h4>
                        <h4 className="text-black fw-normal my-auto">
                          {data.phoneNumber || "No Phone Number Found"}
                        </h4>
                        <h4 className="text-black fw-normal my-auto">
                          Gender: {data.gender}
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

export default AdminUser;
