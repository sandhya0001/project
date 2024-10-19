import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { changeLoggedIn } from "../store/loginSlice";
import { changeLoggedInUser } from "../store/userSlice";
import { toast } from "react-hot-toast";
import { Button } from "@nextui-org/react";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const url = import.meta.env.VITE_BASE_URL;
  async function login() {
    try {
      const res = await axios.post(`${url}/login`, formData, {
        withCredentials: true,
      });
      console.log(res);
      const user = res.data.user;
      localStorage.setItem("loggedInUser", user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isloggedinUser", true);
      dispatch(changeLoggedIn(true));
      dispatch(changeLoggedInUser(user));
      toast.success("Logged in");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }
  async function handleLogin(e) {
    e.preventDefault();
    if (formData.email == "" || formData.password == "") {
      toast.error("Enter all details");
      return;
    }
    await login();
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center px-2 ">

      <form
        className="text-black flex flex-col  py-10 justify-center px-2 w-fit items-center bg-white border-3 rounded-3xl border-yellow-500 gap-5"
        onSubmit={handleLogin}
      >
        <h1 className="text-black font-extrabold ">Log In</h1>
        <div className="text-black flex flex-col items-start">
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            id="email"
            className="px-2 py-1.5 w-72 outline-none border border-black bg-transparent text-black rounded-3xl "
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="text-black flex flex-col items-start">
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <input
            id="password"
            className="px-2 py-1.5 w-72 outline-none border border-black bg-transparent text-black rounded-3xl "
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className="px-2 py-1.5 rounded-3xl outline-none border w-60 bg-blue-800 text-black border-black hover:bg-purple-800 hover:border-purple-800 transition-all duration-200 font-extrabold">
          Login
        </button>
        <Link
          to="/changepassword"
          className="w-full text-center text-black text-md cursor-pointer"
        >
          Forgot password?
        </Link>
        <div className="text-[15px] text-black text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold cursor-pointer">
            <p>Sign up</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
