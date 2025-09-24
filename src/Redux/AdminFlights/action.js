import {
  DELETE_FLIGHTS,
  FETCH_FLIGHTS,
  FLIGHT_FAILURE,
  FLIGHT_REQUEST,
  GET_FLIGHT_SUCCESS,
  POST_FLIGHT_SUCCESS,
} from "./actionType";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../01_firebase/config_firebase";
import axios from "axios";

export const getFlightSuccess = (payload) => {
  return { type: GET_FLIGHT_SUCCESS, payload };
};

export const postFlightSuccess = (payload) => {
  return { type: POST_FLIGHT_SUCCESS };
};

export const flightRequest = () => {
  return { type: FLIGHT_REQUEST };
};

export const flightFailure = () => {
  return { type: FLIGHT_FAILURE };
};

//
export const fetch_flights_product = (payload) => {
  return { type: FETCH_FLIGHTS, payload };
};
//
export const handleDeleteProduct = (payload) => {
  return { type: DELETE_FLIGHTS, payload };
};

export const addFlight = (payload) => async (dispatch) => {
  console.log("addFlight action called with payload:", payload);
  dispatch(flightRequest());

  try {
    const docRef = await addDoc(collection(db, "flights"), payload);
    console.log("Flight added with ID:", docRef.id);
    dispatch(postFlightSuccess());
  } catch (error) {
    console.error("Error adding flight:", error);
    dispatch(flightFailure());
  }
};

export const fetchFlightProducts = (limit) => async (dispatch) => {
  dispatch(flightRequest());

  try {
    const querySnapshot = await getDocs(collection(db, "flights"));
    const flights = [];
    querySnapshot.forEach((doc) => {
      flights.push({ id: doc.id, ...doc.data() });
    });
    console.log("Fetched flights from Firestore:", flights);

    dispatch(fetch_flights_product(flights.slice(0, limit)));
  } catch (error) {
    console.error("Error fetching flights: ", error);
    dispatch(flightFailure());
  }
};

export const DeleteFlightProducts = (deleteId) => async (dispatch) => {
  try {
    const res = await axios(
      `http://localhost:8080/flight?${deleteId}`, //https://makemytrip-api-data.onrender.com/flight/${deleteId}
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    console.log(data);

    dispatch(handleDeleteProduct(deleteId));
  } catch (e) {
    console.log(e);
  }
};

export const addEntity = (entityType, payload) => async (dispatch) => {
  console.log(`addEntity action called for ${entityType} with payload:`, payload);
  dispatch(flightRequest());

  try {
    const docRef = await addDoc(collection(db, entityType), payload);
    console.log(`${entityType} added with ID:`, docRef.id);
    dispatch(postFlightSuccess());
  } catch (error) {
    console.error(`Error adding ${entityType}:`, error);
    dispatch(flightFailure());
  }
};
