import "./Admin.Module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addEntity } from "../../Redux/AdminFlights/action";
import { useDispatch } from "react-redux";

let initialState = {
  image: "",
  name: "",
  place: "",
  price: "",
  description: "",
  additional: "",
};
export const AdminStay = () => {
  const [stay, setStay] = useState(initialState);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setStay((prev) => {
      return { ...prev, [name]: name === "price" ? +value : value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(stay);
    dispatch(addEntity("stays", stay));
    setStay(initialState);
  };

  return (
    <>
      <div className="adminFlightMai">
        <div className="adminSideBr">
          <h1>
            <Link to={"/admin"}>Home</Link>
          </h1>
          <h1>
            <Link to={"/admin/adminflight"}>Add Flight</Link>
          </h1>
          <h1>
            <Link to={"/admin/adminstay"}>Add Stays</Link>
          </h1>
          <h1>
            <Link to={"/admin/products"}>All Flights</Link>
          </h1>
          <h1>
            <Link to={"/admin/hotels"}>All Hotels</Link>
          </h1>
          <h1>
            <Link to={"/"}>Log out</Link>
          </h1>
        </div>
        <div className="adminFlightBox">
          <div className="adminHead">
            <h2>Admin Panel for Stays</h2>
          </div>

          <div className="adminFlightInputs">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="adminFlightInputBx">
                <label htmlFor="">Stay Image</label>
                <input
                  type="url"
                  name="image"
                  value={stay.image}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="adminFlightInputBx">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  value={stay.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="adminFlightInputBx">
                <label htmlFor="">Place</label>
                <input
                  type="text"
                  name="place"
                  value={stay.place}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  name="price"
                  value={stay.price}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  name="description"
                  value={stay.description}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Additional</label>
                <input
                  type="text"
                  name="additional"
                  value={stay.additional}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="adminFlightInputBx">
                <span></span>
                <button>Add Stay</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

