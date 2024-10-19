/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button } from "@nextui-org/react";

export default function SignUp() {
  const navigate=useNavigate()
  const [optSent, setOptSent] = useState(false);
  const [buttonText, setButtonText] = useState("Sign Up");
  const [optText, setOptText] = useState("Send OTP");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    otp: "",
    // registration_no: "",
    // college: "",
  });
  // const collegeOptions = [
  //   "BAKHTIYARPUR COLLEGE OF ENGINEERING, PATNA",
  //   "B. P. MANDAL COLLEGE OF ENGINEERING, MADHEPURA",
  //   "BHAGALPUR COLLEGE OF ENGINEERING, BHAGALPUR",
  //   "DARBHANGA COLLEGE OF ENGINEERING, DARBHANGA",
  //   "GAYA COLLEGE OF ENGINEERING, GAYA",
  //   "GOVERNMENT ENGINEERING COLLEGE, ARWAL",
  //   "GOVERNMENT ENGINEERING COLLEGE, AURANGABAD",
  //   "GOVERNMENT ENGINEERING COLLEGE, BANKA",
  //   "GOVERNMENT ENGINEERING COLLEGE, BHOJPUR",
  //   "GOVERNMENT ENGINEERING COLLEGE, BUXAR",
  //   "GOVERNMENT ENGINEERING COLLEGE, GOPALGANJ",
  //   "GOVERNMENT ENGINEERING COLLEGE, JAMUI",
  //   "GOVERNMENT ENGINEERING COLLEGE, JEHANABAD",
  //   "GOVERNMENT ENGINEERING COLLEGE, KAIMUR",
  //   "GOVERNMENT ENGINEERING COLLEGE, KHAGARIA",
  //   "GOVERNMENT ENGINEERING COLLEGE, KISHANGANJ",
  //   "GOVERNMENT ENGINEERING COLLEGE, LAKHISARAI",
  //   "GOVERNMENT ENGINEERING COLLEGE, MADHUBANI",
  //   "GOVERNMENT ENGINEERING COLLEGE, MUNGER",
  //   "GOVERNMENT ENGINEERING COLLEGE, NAWADA",
  //   "GOVERNMENT ENGINEERING COLLEGE, SHEIKHPURA",
  //   "GOVERNMENT ENGINEERING COLLEGE, SHEOHAR",
  //   "GOVERNMENT ENGINEERING COLLEGE, SIWAN",
  //   "GOVERNMENT ENGINEERING COLLEGE, VAISHALI",
  //   "GOVERNMENT ENGINEERING COLLEGE, WEST CHAMPARAN",
  //   "KATIHAR ENGINEERING COLLEGE, KATIHAR",
  //   "LOK NAYAK JAI PRAKASH INSTITUTE OF TECHNOLOGY, CHAPRA",
  //   "MOTIHARI COLLEGE OF ENGINEERING, MOTIHARI",
  //   "MUZAFFARPUR INSTITUTE OF TECHNOLOGY, MUZAFFARPUR",
  //   "NETAJI SUBHAS INSTITUTE OF TECHNOLOGY, BIHTA",
  //   "PURNEA COLLEGE OF ENGINEERING, PURNEA",
  //   "RASHTRAKAVI RAMDHARI SINGH DINKAR COLLEGE OF ENGINEERING, BEGUSARAI",
  //   "SAHARSA COLLEGE OF ENGINEERING, SAHARSA",
  //   "SERSHAH ENGINEERING COLLEGE, SASARAM, ROHTAS",
  //   "Shri Phanishwar Nath Renu Engineering College, Araria",
  //   "SITAMARHI INSTITUTE OF TECHNOLOGY, SITAMARHI",
  //   "SUPAUL COLLEGE OF ENGINEERING, SUPAUL",
  //   "VIDYA VIHAR INSTITUTE OF TECHNOLOGY, PURNIA"
  // ]
    ;
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function signup() {
    setButtonText("Signing up...");
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const res = await axios.post(`${url}/signup`, formData, {
        withCredentials: true,
      });
      toast.success("Account created");
      setButtonText("Sign Up");
      
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setButtonText("Sign up");
  }
  function resetFormData() {
    const blankFormData = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      otp: "",
    };
    setFormData(blankFormData);
    setOptSent(false);
    setButtonText("Sign Up");
    setOptText("Send OTP");
    navigate("/login")
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.password != formData.confirmPassword) {
      toast.error("Password & Confirm password does not match");
    }
    await signup();
    resetFormData();
  }
  async function handleOTP(e) {
    e.preventDefault();
    if (
      formData.name == "" ||
      formData.email == "" ||
      formData.confirmPassword == "" ||
      formData.mobile == ""
    ) {
      toast.error("please fill all the details");
      return;
    }
    if (formData.password != formData.confirmPassword) {
      toast.error("Password & Confirm password does not match");
      return;
    }
    const url = import.meta.env.VITE_BASE_URL;
    toast("Sending OTP");
    try {
      const res = await axios.post(`${url}/sendotpforsignup`, formData, {
        withCredentials: true,
      });
      setOptSent(true);
      setOptText("Resend OTP");
      toast.success("OTP sent");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
  // Css from here---->>>>
  return (
    <div className="min-h-screen w-screen flex justify-center font-poppins py-4 items-center ">
      <form
        action=""
        className="text-black bg-white flex w-fit  h-fit   flex-col justify-center space-y-2 items-center border pt-1 pb-5 px-4 rounded-2xl"
      >
        <h1 className="text-lg font-bold ">Register</h1>
        <div className="flex gap-2 sm:flex-row flex-col">
          <div>
            {/* name */}
            <div className="text-black flex  flex-col items-start w-fit">
              <label htmlFor="name" className="p-2  border-black text-lg">
                Name:
              </label>
              <input
                id="name"
                className="px-2 py-1.5 outline-none border w-60 border-black bg-transparent text-black rounded-full"
                type="name"
                name="name"
                placeholder="Enter your Name*"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
             {/* mobile */}
             <div className="text-black flex flex-col items-start w-fit">
              <label htmlFor="mobile" className="p-2 text-lg ">
                Mobile:
              </label>
              <input
                id="mobile"
                className="px-2 py-1.5 outline-none border w-60 border-black bg-transparent text-black rounded-full"
                type="text"
                name="mobile"
                placeholder="Enter your Phone no."
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            {/* registration no */}
            {/* <div className="text-black flex flex-col items-start w-fit">
              <label htmlFor="registraion_no" className="p-2  text-lg">
                Registration No:
              </label>
              <input
                id="registraion_no"
                className="px-2 py-1.5 outline-none w-48 md:w-60 border border-black bg-transparent text-black rounded-full"
                type="text"
                name="registration_no"
                placeholder="Enter Registraion No.*"
                value={formData.registration_no}
                onChange={handleChange}
              />
            </div> */}
            {/* college */}
            {/* <div className="text-black flex flex-col items-start w-fit">
              <label htmlFor="college" className="p-2  text-lg">
                College:
              </label>
              <select
                id="college"
                className="px-2 cursor-pointer py-1.5 w-48 md:w-60 outline-none border border-black  rounded-2xl bg-transparent text-black"
                name="college"
                value={formData.college}
                onChange={handleChange}
              >
                <option
                  className=" bg-white w-48 md:w-60 cursor-pointer "
                  value=""
                >
                  Select Your College
                </option>
                {collegeOptions.map((college) => {
                  return (
                    <option
                      className=" cursor-pointer bg-white w-48 md:w-60"
                      value={college}
                    >
                      {college}
                    </option>
                  );
                })}
              </select>
            </div> */}
            {/* email */}
            <div className="text-black flex flex-col items-start w-fit">
              <label htmlFor="email" className="p-2 text-lg">
                Email:
              </label>
              <input
                id="email"
                className="px-2 py-1.5 outline-none border w-60 border-black bg-transparent text-black rounded-full"
                type="email"
                name="email"
                placeholder="Enter your email*"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            {" "}
            {/* password */}
            <div className="text-black flex flex-col items-start w-fit">
              <label htmlFor="password" className="p-2 text-lg">
                Password:
              </label>
              <input
                id="password"
                className="px-2 py-1.5 outline-none border w-60 border-black bg-transparent text-black rounded-full"
                type="password"
                name="password"
                placeholder="Create Password*"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {/* confirm password */}
            <div className="text-black flex flex-col items-start w-fit">
              <label htmlFor="confirmPassword" className="p-2 text-lg">
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                className="px-2 py-1.5 outline-none border w-60 border-black bg-transparent text-black rounded-full"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password*"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
           
            {/* otp field */}
            {optSent && (
              <div className="text-black flex flex-col items-start w-fit">
                <label htmlFor="otp" className="p-2 text-lg ">
                  OTP:
                </label>
                <input
                  id="otp"
                  className="px-2 py-1.5 outline-none border w-60 border-black bg-transparent text-black rounded-full"
                  type="text"
                  name="otp"
                  placeholder="Enter otp send to your mail"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>
        {/* send otp and signup button */}
        <div className="flex justify-between gap-3">
          <Button
            color="primary"
            variant="shadow"
            onClick={handleOTP}
            className="px-2 py-1.5  rounded-full outline-none w-32  md:w-40  text-white  transition-all duration-200 focus:outline-none"
          >
            {optText}
          </Button>
          {optSent && (
            <Button
              onClick={handleSubmit}
              className="px-2 py-1.5 rounded-full outline-none border w-32  md:w-40  text-white border-black bg-red-600 hover:bg-green-600 transition-all duration-200 focus:outline-none"
            >
              {buttonText}
            </Button>
          )}
        </div>
        {/* already have an account option */}
        <div className="text-lg text-center">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold cursor-pointer">
            <p className=" text-large">Login</p>
          </Link>
        </div>
      </form>
    </div>
  );
}
