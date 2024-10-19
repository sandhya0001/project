import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillHandbagFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import logo from "../assests/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { changeLoggedInUser } from "../store/userSlice";
import { changeLoggedIn } from "../store/loginSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { removeMyEvents } from "../store/myEventSlice";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.loggedIn);
  const cart = useSelector((state) => state.cart);
  const handleLogout = async () => {
    try {
      const url = import.meta.env.VITE_BASE_URL;
      const res = await axios.post(`${url}/logout`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("isloggedinUser");
        localStorage.removeItem("loggedInUser");
        dispatch(changeLoggedInUser({}));
        dispatch(removeMyEvents())
        dispatch(changeLoggedIn(false));
        toast.success("Logged Out");
        navigate("/");
      } else {
        console.log("Logout failed with status:", res.status);
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Try Again");
      // navigate("/");
    }
  };
  return (
    <div className="navbar bg-black fixed flex -space-x-10 left-0 right-0 top-0 z-50 mb-1 border-b border-neutral-800 font-poppins ">
      {/* Hamburger */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost  shadow-none border-none btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm  bg-neutral-800 text-white dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/events">All Events</Link>
            </li>
            {!loggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!loggedIn && (
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* logo */}
      <div className="flex-1">
        <Link
          to="/"
          className=" btn shadow-none border-none bg-transparent text-xl "
        >
          {" "}
          <img className=" h-[52px]" src={logo} alt="dsd" />
        </Link>
      </div>
      {/* cart + profile */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <Link to="/mycart">
            <div
              tabIndex={0}
              role="button"
              className="btn m-0 p-0 shadow-none border-none hover:bg-transparent active:border-none bg-transparent  rounded-full  md:mr-5  "
            >
              <div className="indicator  ">
                <BsFillHandbagFill className="relative  text-white sm:w-6 sm:h-6 w-5 h-5" />
                <span className="badge badge-sm indicator-item text-white bg-red-500 absolute right-4 rounded-full border-0">
                  {cart.length}
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className=" btn btn-circle h-8 bg-transparent border-0 shadow-none "
          >
            <div className="w-10 rounded-full">
              <CgProfile className="h-8  w-full text-white" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content  bg-neutral-800 text-white  rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/myevents">My Events</Link>
            </li>
            {loggedIn && (
              <li onClick={handleLogout}>
                <Link>Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
