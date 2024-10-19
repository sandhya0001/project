import axios from "axios";
import React, { useState } from "react";
import NewPassword from "../components/NewPassword";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button } from "@nextui-org/react";

export default function ChangePassword() {
  const [showFull, setShowFull] = useState(false);
  const [optSent, setOptSent] = useState(false);
  const [optText, setOptText] = useState("Send OTP");
  const [buttonText, setButtonText] = useState("Change Password");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleOTP(e) {
    e.preventDefault();
    if (formData.email == "") {
      toast.error("please fill all the details");
      return;
    }
    toast("Sending OTP...");
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const res = await axios.post(`${url}/otpforresetpassword`, formData, {
        withCredentials: true,
      });
      setOptSent(true);
      setOptText("Resend OTP");
      toast.success("OTP sent");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }
  async function handleChangePassword(e) {
    e.preventDefault();
    if (formData.password != formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const url = import.meta.env.VITE_BASE_URL;
    try {
      toast("Changine Password");
      const res = await axios.post(`${url}/changepassword`, formData, {
        withCredentials: true,
      });
      toast.success("Password Changed");
      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 3000);
    } catch (err) {
      err?.response?.data?.message
        ? toast.error(err.response.data.message)
        : toast.error("Try again");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }
  return (
    <div className=" px-3 text-black flex justify-center items-center font-poppins min-h-screen overflow-hidden">
      <div className="overflow-hidden bg-white  w-[300px]  md:px-10  backdrop rounded-2xl border-5 border-yellow-400">
        <form className="text-black flex flex-col py-12 justify-center items-center gap-4">
          <h1 className="text-xl font-bold">Reset Password</h1>
          {!optSent && (
            <div className="text-black flex flex-col items-start">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                className="px-2 mt-1 py-1.5 outline-none border rounded-2xl border-black bg-transparent text-black"
                type="email"
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          )}
          {optSent && (
            <NewPassword handleChange={handleChange} formData={formData} />
          )}
          <p className="w-full text-start text-xs text-red-500 font-bold">
            {message}
          </p>
          <div className="flex  justify-between gap-3">
            {optSent && (
              <Button
                color="primary"
                variant="shadow"
                onClick={handleChangePassword}
                className="px-2 py-1.5 text-xs outline-none border w-32 h-8 rounded-2xl text-white bg-green-800 border-black hover:bg-black transition-all duration-200 focus:outline-none"
              >
                {buttonText}
              </Button>
            )}
            <Button
              color="primary"
              variant="shadow"
              onClick={handleOTP}
              className="px-2 py-1.5 text-xs outline-none border w-20 h-8 rounded-2xl text-white bg-red-600 border-black hover:bg-black transition-all duration-200 focus:outline-none"
            >
              {optText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
