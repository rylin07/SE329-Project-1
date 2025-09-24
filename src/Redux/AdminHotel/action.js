import {
  HOTEL_FAILURE,
  HOTEL_REQUEST,
  GET_HOTEL_SUCCESS,
  POST_HOTEL_SUCCESS,
  NEW_GET_HOTELS_SUCCESS,
  DELETE_HOTEL,
} from "./actionType";
import { collection, addDoc, getDocs } from "firebase/firestore";
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

//

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

export const fetchingHotels = (limit) => async (dispatch) => {
  dispatch(hotelRequest());

  try {
    const querySnapshot = await getDocs(collection(db, "stays"));
    const hotels = [];
    querySnapshot.forEach((doc) => {
      hotels.push({ id: doc.id, ...doc.data() });
    });

    dispatch(fetch_hotel(hotels.slice(0, limit)));
  } catch (error) {
    console.error("Error fetching hotels: ", error);
    dispatch(hotelFailure());
  }
};

export const DeleteHotel = (deleteId) => async (dispatch) => {
  try {
    const res = await fetch(
      `http://localhost:8080/hotel/${deleteId}`, // https://makemytrip-api-data.onrender.com/hotel/${deleteId}
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await res.json();
    console.log(data);
    dispatch(handleDeleteHotel(deleteId));
  } catch (e) {
    console.log(e);
  }
};
