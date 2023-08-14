import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {

  return (
    <>
      <Sidebar
        icon1="fa-solid fa-home text-white active"
        link1="Dashboard"
        path1="/dashboard"
        icon2="fa-solid fa-user"
        link2="Profile"
        path2="/profile"
        icon3="fa-solid fa-book"
        link3="Booking"
        path3="/booking"
      />
      <section id="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-3 shadow mb-3">
              <h4>Dashboard</h4>
            </div>
            <div className="col-12 p-3">
              <div className="col-6"></div>
              <div className="col-6"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
