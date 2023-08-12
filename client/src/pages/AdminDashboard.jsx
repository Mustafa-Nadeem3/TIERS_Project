import React from "react";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
  return (
    <>
      <Sidebar
        icon1="fa-solid fa-home text-white active"
        link1="Dashboard"
        path1="/admin_dashboard"
        icon2="fa-solid fa-user"
        link2="User"
        path2="/users"
        icon3="fa-solid fa-book"
        link3="Booking"
        path3="/booking"
      />
      <section id="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-3 shadow mb-3">
              <h4>Admin Dashboard</h4>
            </div>
            <div className="col-12 p-3">
              <div className="col-6">
                <div class="card border-0">
                  <div class="card-body mx-auto text-center">
                    <h1 class="card-title">0</h1>
                    <div className="d-flex">
                      <i className="fa-solid fa-user"></i>
                      <h4 class="card-text me-3 text-primary">Users</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div class="card border-0">
                  <div class="card-body mx-auto text-center">
                    <h1 class="card-title">0</h1>
                    <div className="d-flex">
                      <i className="fa-solid fa-rupee-sign"></i>
                      <h4 class="card-text me-3 text-primary">Income</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
