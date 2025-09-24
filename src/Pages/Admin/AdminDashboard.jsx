import { collection, getDocs } from "firebase/firestore";
import { db } from "../../01_firebase/config_firebase";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.Module.css";

export const AdminDashboard = () => {
  const [flight, setFlight] = useState(0);
  const [hotel, setHotel] = useState(0);
  const [users, setUsers] = useState(0);
  const [giftCard, setGiftCard] = useState(0);
  const [things, setThings] = useState(0);

  const fetchData = async () => {
    try {
      const flightsSnapshot = await getDocs(collection(db, "flights"));
      console.log("Fetched flights:", flightsSnapshot.docs.map((doc) => doc.data()));
      setFlight(flightsSnapshot.size);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }

    try {
      const staysSnapshot = await getDocs(collection(db, "stays"));
      console.log("Fetched stays:", staysSnapshot.docs.map((doc) => doc.data()));
      setHotel(staysSnapshot.size);
    } catch (error) {
      console.error("Error fetching stays:", error);
    }

    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      console.log("Fetched users:", usersSnapshot.docs.map((doc) => doc.data()));
      setUsers(usersSnapshot.size);
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    try {
      const giftCardsSnapshot = await getDocs(collection(db, "giftcards"));
      console.log("Fetched giftcards:", giftCardsSnapshot.docs.map((doc) => doc.data()));
      setGiftCard(giftCardsSnapshot.size);
    } catch (error) {
      console.error("Error fetching giftcards:", error);
    }

    try {
      const thingsSnapshot = await getDocs(collection(db, "Things_todo"));
      console.log("Fetched things to do:", thingsSnapshot.docs.map((doc) => doc.data()));
      setThings(thingsSnapshot.size);
    } catch (error) {
      console.error("Error fetching things to do:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="mainAdminLandingpage">
        <div className="adminSideBr">
          <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>
        </div>
        <div className="mainBox">
          <div className="mainBoxHead">
            <h1>Admin Dashboard</h1>
            <hr />
            <hr />
            <hr />
          </div>
          <div className="DataBoxes">
            {/*  */}
            <div className="dataBx">
              <h1>Total Hotel</h1>
              {<h1>{hotel}</h1>}
              <Link to="/admin/hotels">View</Link>
            </div>
            <div className="dataBx">
              <h1>Total Flights</h1>
              {<h1>{flight}</h1>}
              <Link to="/admin/flights">View</Link>
            </div>
            <div className="dataBx">
              <h1>Total Users</h1>
              {<h1>{users}</h1>}
              <Link to="/admin">View</Link>
            </div>
            <div className="dataBx">
              <h1>Giftcards</h1>
              {<h1>{giftCard}</h1>}
              <Link to="/admin/giftcards">View</Link>
            </div>
            <div className="dataBx">
              <h1>Pakages Available</h1>
              {<h1>{things}</h1>}
              <Link to="/setThings">View</Link>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
};
