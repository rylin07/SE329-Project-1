import axios from "axios";
import {
  SELECTED_DATE_AND_CITY,
  SELECTED_CITY,
  HOTEL_FAILURE,
  HOTEL_REQUEST,
  GET_HOTEL_SUCCESS,
  POST_HOTEL_SUCCESS,
  NEW_GET_HOTELS_SUCCESS,
  DELETE_HOTEL,
} from "./actionType";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../01_firebase/config_firebase";

export const getHotelSuccess = (payload) => {
  return { type: GET_HOTEL_SUCCESS, payload };
};

export const postHotelSuccess = (payload) => {
  return { type: POST_HOTEL_SUCCESS };
};

export const hotelRequest = () => {
  return { type: HOTEL_REQUEST };
};

export const hotelFailure = () => {
  return { type: HOTEL_FAILURE };
};

export const fetch_hotel = (payload) => {
  return { type: NEW_GET_HOTELS_SUCCESS, payload };
};

//
export const handleDeleteHotel = (payload) => {
  return { type: DELETE_HOTEL, payload };
};

//Pick date and city for storing into redux store

export const selectDateAndCity = (checkInDate, checkOutDate) => {
  return { type: SELECTED_DATE_AND_CITY, payload: { checkInDate, checkOutDate } };
};
export const selectCity = (selectedCity) => {
  return { type: SELECTED_CITY, payload: { selectedCity } };
};

export const addHotel = (payload) => async (dispatch) => {
  dispatch(hotelRequest());

  try {
    const docRef = await addDoc(collection(db, "hotels"), payload);
    console.log("Hotel added with ID: ", docRef.id);
    dispatch(postHotelSuccess());
  } catch (error) {
    console.error("Error adding hotel: ", error);
    dispatch(hotelFailure());
  }
};

export const fetchingHotels = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "stays"));
    const stays = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: "FETCH_HOTELS_SUCCESS", payload: stays });
  } catch (error) {
    console.error("Error fetching stays:", error);
    dispatch({ type: "FETCH_HOTELS_FAILURE" });
  }
};

export const DeleteHotel = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "stays", id));
    dispatch({ type: "DELETE_HOTEL_SUCCESS", payload: id });
  } catch (error) {
    console.error("Error deleting stay:", error);
    dispatch({ type: "DELETE_HOTEL_FAILURE" });
  }
};

export const addStay = (stayData) => async (dispatch) => {
  dispatch({ type: "ADD_STAY_REQUEST" });

  try {
    const docRef = await addDoc(collection(db, "stays"), {
      ...stayData,
      price: stayData.price || 0, // Default to 0
      rating: stayData.rating || 1, // Default to 1
    });
    console.log("Stay added with ID:", docRef.id);
    dispatch({ type: "ADD_STAY_SUCCESS", payload: { id: docRef.id, ...stayData } });
  } catch (error) {
    console.error("Error adding stay:", error);
    dispatch({ type: "ADD_STAY_FAILURE" });
  }
};
