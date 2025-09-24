import React, { useEffect, useState } from "react";
import "./adminProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { fetchFlightProducts, DeleteFlightProducts } from "../../Redux/AdminFlights/action";

const AllFlights = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  const { isLoading, data: flights } = useSelector((store) => {
    const adminFlights = store.adminFlights || {};
    return {
      isLoading: adminFlights.isLoading || false,
      data: adminFlights.data || [],
    };
  }, shallowEqual);

  const handleDeleteFlight = (deleteId) => {
    dispatch(DeleteFlightProducts(deleteId));
    toast.success("Flight Removed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleLoadMore = () => {
    if (flights.length >= limit) {
      setLimit((prev) => prev + 5);
    }
  };

  useEffect(() => {
    dispatch(fetchFlightProducts(limit));
  }, [limit, dispatch]);

  return (
    <>
      <ToastContainer />
      <div className="adminProductMain">
        <div className="adminSideBr">
          <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>
        </div>
        <div className="adminProductbox">
          <div className="filterProdcut">
            <input placeholder="Search Flight" type="text" />
            <button>Search</button>
            {limit > flights.length ? (
              ""
            ) : (
              <button onClick={handleLoadMore}>Load More</button>
            )}
          </div>
          <div className="head"><h1>All Flights</h1></div>

          {isLoading ? <h1>Please wait...</h1> : ""}
          {flights.map((flight, i) => (
            <div key={i} className="adminProductlist">
              <span>{flight.airline || "Unknown Airline"}</span>
              <span>{flight.from}</span>
              <span>{flight.to}</span>
              <span>Rs.{flight.price}</span>
              <span>{flight.number}</span>
              <span>
                <button onClick={() => handleDeleteFlight(flight.id)}>
                  Delete <i className="fa fa-trash"></i>
                </button>
                <button>
                  Edit <i className="fa fa-pencil"></i>
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllFlights;