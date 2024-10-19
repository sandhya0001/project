import { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CreateEvent from "./pages/CreateEvent";
import HomePage from "./pages/HomePage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addEvents } from "./store/eventSlice";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import ChangePassword from "./pages/ChangePassword";
import Navbar from "./components/Navbar.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import CartPage from "./pages/CartPage";
import { changeLoggedIn } from "./store/loginSlice";
import MyEvents from "./pages/MyEvents";
import PrivateRoute from "./components/PrivateRoute";
import { addMyEvents } from "./store/myEventSlice";
import PaymentSuccess from "./pages/PaymentSuccess";
import DetailPage from './pages/DetailPage'
import CategoryPage from "./pages/CategoryPage";
export default function App() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn)
  const isLoggedIn = () => {
    if (token !== null) {
      dispatch(changeLoggedIn(true));
    } else {
      dispatch(changeLoggedIn(false));
    }
  };
  const getAllEvents = async () => {
    const url = import.meta.env.VITE_BASE_URL;
    const response = await axios.get(`${url}/allevents`);
    dispatch(addEvents(response.data.events));
  };
  const getUserEvents = async () => {
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.get(`${url}/userevents`);
      dispatch(addMyEvents(response.data.events))
    } catch (err) {
      console.log(err)
      dispatch(addMyEvents([]))
    }
  }
  useEffect(() => {
    isLoggedIn();
    if (loggedIn) {
      getUserEvents();
    }
    getAllEvents();
  }, []);
  return (
    <div className="prevent-select overflow-hidden">
      <p className="py-[33px]"></p>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/createevent" element={<CreateEvent />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/mycart" element={

          <CartPage />
        } />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/myevents" element={
          <PrivateRoute>
            <MyEvents />
          </PrivateRoute>
        } />
        <Route path="/event/:eventId" element={<DetailPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
