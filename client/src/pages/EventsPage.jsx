import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const events = useSelector((state) => state.events);
  const [eventsToShow, setEventsToShow] = useState([]);
  useEffect(() => {
    setEventsToShow(events);
  }, [events]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      <div className="relative h-full w-full bg-slate-900 -mt-10">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="min-h-screen w-full font-poppins bg-black">
          <h1 className="font-bold text-5xl text-center text-white py-5  ">
            Events
          </h1>
          <div className={`bg-black  font-poppins items-center flex justify-center pb-5`}>
            <div className="  flex mb-9  flex-wrap gap-10  justify-center">
              {eventsToShow.length > 0
                ? eventsToShow.map((event) => (
                  <Cards key={event._id} event={event} fromCart={false} />
                ))
                : [0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
                  return (
                    <div
                      key={index}
                      className="col-span-12 sm:col-span-4 md:h-[300px] md:w-[240px] h-[250px] w-[200px] bg-gray-200 rounded-lg animate-pulse"
                    >
                      <div className="h-3/4 bg-gray-300 rounded-t-lg"></div>
                      <div className="flex justify-between items-center p-2 bg-gray-200 rounded-b-lg">
                        <div className="flex flex-col">
                          <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
                          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                        </div>
                        <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;
