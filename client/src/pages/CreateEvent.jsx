import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function CreateEvent() {
  const [formData, setFormData] = useState({
    event_name: "",
    about: "",
    event_date:"",
    registration_price: "",
    event_managers: { name: "", mobile: "" },
    winner_prize: "",
    runnerup_prize: "",
    category: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  function handleFormData(e) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => {
        const newFormData = { ...prevData };
        if (name.includes(".")) {
          const keys = name.split(".");
          newFormData[keys[0]][keys[1]] = value;
        } else {
          newFormData[name] = value;
        }
        return newFormData;
      });
    }
  }

  async function addEvent() {
    setMessage("Creating Event");
    const formDataToSend = new FormData();
    formDataToSend.append("about", formData.about);
    formDataToSend.append(
      "event_managers",
      JSON.stringify(formData.event_managers)
    );
    formDataToSend.append("category", formData.category);
    formDataToSend.append("event_date", formData.event_date);
    formDataToSend.append("event_name", formData.event_name);
    formDataToSend.append("registration_price", formData.registration_price);
    formDataToSend.append("winner_prize", formData.winner_prize);
    formDataToSend.append("runnerup_prize", formData.runnerup_prize);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    try {
      const url = import.meta.env.VITE_BASE_URL;
      const res = await axios.post(`${url}/addevent`, formDataToSend, {
        withCredentials: true,
      });
      toast.success("Event Created");
      resetFormData();
      setMessage("");
    } catch (err) {
      toast.error("Event not created,try again");
      console.log(err);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setMessage(err.response.data.message);
    }
  }
  function resetFormData() {
    const emptyFormData = {
      event_name: "",
      about: "",
      event_date:"",
      registration_price: "",
      event_managers: {
        name: "", mobile: ""
      },
      winner_prize: "",
      runnerup_prize: "",
      category: "",
      image: null,
    };
    setFormData(emptyFormData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await addEvent();
  }

  return (
    <form
      className="text-white bg-black h-screen flex flex-col justify-center items-center gap-3"
      onSubmit={handleSubmit}
    >
      <div className="text-white w-1/2 flex flex-col">
        <label htmlFor="event_name">event name</label>
        <input
          type="text"
          id="event_name"
          className="px-2 py-1.5 rounded-md outline-none border border-white bg-transparent text-white resize-none"
          name="event_name"
          placeholder="event_name"
          value={formData.event_name}
          onChange={handleFormData}
        />
      </div>
      <div className="text-white w-1/2 flex flex-col">
        <label htmlFor="about">About</label>
        <textarea
          id="about"
          className="px-2 py-1.5 w-full rounded-md outline-none border border-white bg-transparent text-white resize-none"
          name="about"
          placeholder="About"
          value={formData.about}
          onChange={handleFormData}
          rows="2"
        />
      </div>

      <div className="text-white flex flex-wrap items-center justify-center  gap-4 w-1/2 max-w-md">
        {/* event manager name */}
        <div className="flex flex-col">
          <label htmlFor="eventmanagername">
            event manager name<span className="text-black">*</span>
          </label>
          <input
            id="eventmanagername"
            className="px-2 py-1.5 md:w-[150px] w-[200px] rounded-md outline-none border border-white bg-transparent text-white"
            type="text"
            name="event_managers.name"
            placeholder="Event Manager Name"
            value={formData.event_managers.name}
            onChange={handleFormData}
          />
        </div>
        {/* evet manager mobile */}
        <div className="flex flex-col">
          <label htmlFor="eventmanagermobile">
            event manager mobile<span className="text-black">*</span>
          </label>
          <input
            id="eventmanagermobile"
            className="px-2 py-1.5 md:w-[150px] w-[200px] rounded-md outline-none border border-white bg-transparent text-white"
            type="text"
            name="event_managers.mobile"
            placeholder="Event Manager Name"
            value={formData.event_managers.mobile}
            onChange={handleFormData}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category">
            event category<span className="text-black">*</span>
          </label>
          <input
            id="category"
            className="px-2 py-1.5 md:w-[150px] w-[200px] rounded-md outline-none border border-white bg-transparent text-white"
            type="text"
            name="category"
            placeholder="Event category"
            value={formData.category}
            onChange={handleFormData}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="event_date">
            event Date<span className="text-black">*</span>
          </label>
          <input
            id="event_date"
            className="px-2 py-1.5 md:w-[150px] w-[200px] rounded-md outline-none border border-white bg-transparent text-white"
            type="text"
            name="event_date"
            placeholder="Event Date"
            value={formData.event_date}
            onChange={handleFormData}
          />
        </div>
      </div>

      {/* winner runnerup prizes */}
      <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        <div className="flex flex-col">
          <label htmlFor="winner_prize">
            winner prize<span className="text-black">*</span>
          </label>
          <input
            id="winner_prize"
            className="px-2 py-1.5 md:w-[150px] w-[200px] rounded-md outline-none border border-white bg-transparent text-white"
            type="text"
            name="winner_prize"
            placeholder="winner prize"
            value={formData.winner_prize}
            onChange={handleFormData}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="runnerup_prize">
            runnerup prize<span className="text-black">*</span>
          </label>
          <input
            id="runnerup_prize"
            className="px-2 py-1.5 md:w-[150px] w-[200px] rounded-md outline-none border border-white bg-transparent text-white"
            type="text"
            name="runnerup_prize"
            placeholder="runnerup prize"
            value={formData.runnerup_prize}
            onChange={handleFormData}
          />
        </div>
      </div>
      {/*registration charge and poster  */}
      <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        <div className="flex flex-col">
          <label htmlFor="registration_price">
            registration_price<span className="text-black">*</span>
          </label>
          <input
            id="registration_price"
            className="px-2 py-1.5 md:w-[150px] w-[200px] rounded-md outline-none border border-white bg-transparent text-white"
            type="text"
            name="registration_price"
            placeholder="registration price"
            value={formData.registration_price}
            onChange={handleFormData}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            className="px-2 md:w-[150px]  w-[200px] py-1.5 rounded-md outline-none border text-black border-white bg-trasnparent"
            type="file"
            name="image"
            onChange={handleFormData}
          />
        </div>
      </div>

      <p className="w-1/2 text-start text-xs text-red-500 font-bold">
        {message}
      </p>
      <button className="px-2 py-1.5 rounded-md outline-none border text-white border-white hover:bg-purple-800 hover:border-purple-800 transition-all duration-200">
        Create Event
      </button>
    </form>
  );
}
