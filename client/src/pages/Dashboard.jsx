import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [serverData, setServerData] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState("");

  async function getUser() {
    try {
      const response = await fetch("https://hotel-haven.onrender.com/user", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (data) {
        setServerData(data.user);
        console.log(data);
      } else {
        alert("Error Finding User");
        localStorage.remove("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  async function addComment() {
    try {
      const response = await fetch("https://hotel-haven.onrender.com/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: serverData.name,
          comment: comment,
          stars: stars,
        }),
      });

      const data = await response.json();
      if (data) {
        console.log(data);
      } else {
        alert("Error" + response);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRatingChange = (event) => {
    const selectedRating = event.target.value;
    setStars(selectedRating);
  };

  useEffect(() => {
    getUser();
  }, []);
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
            <div className="col-12 p-3 d-flex justify-content-center align-items-center">
              <div className="col-6 text-center">
                <h4 className="mb-3">Leave A Comment</h4>
                <form onSubmit={addComment}>
                  <div class="form-floating mb-3">
                    <textarea
                      class="form-control"
                      placeholder="Leave a comment here"
                      id="customerComment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <label for="customerComment">Comment</label>
                  </div>
                  <div class="rating fs-2 mb-3">
                    <input
                      type="radio"
                      id="star5"
                      name="rating"
                      value="5"
                      onChange={handleRatingChange}
                    />
                    <label for="star5" title="Excellent"></label>
                    <input
                      type="radio"
                      id="star4"
                      name="rating"
                      value="4"
                      onChange={handleRatingChange}
                    />
                    <label for="star4" title="Very Good"></label>
                    <input
                      type="radio"
                      id="star3"
                      name="rating"
                      value="3"
                      onChange={handleRatingChange}
                    />
                    <label for="star3" title="Good"></label>
                    <input
                      type="radio"
                      id="star2"
                      name="rating"
                      value="2"
                      onChange={handleRatingChange}
                    />
                    <label for="star2" title="Fair"></label>
                    <input
                      type="radio"
                      id="star1"
                      name="rating"
                      value="1"
                      onChange={handleRatingChange}
                    />
                    <label for="star1" title="Very Poor"></label>
                  </div>
                  <div class="text-center">
                    <button id="submit" type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
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
