import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cards from "../components/Cards"
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addMyEvents } from '../store/myEventSlice';
export default function MyEvents() {
    const myEvents=useSelector(state=>state.myEvents)
    const [eventsToShow, setEventsToShow] = useState(myEvents)
    const [isLoaded, setIsLoaded] = useState(false)
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const dispatch = useDispatch()
    const getUserEvents = async () => {
        setIsLoaded(false)
        const url = import.meta.env.VITE_BASE_URL;
        try {

            const response = await axios.get(`${url}/userevents`);
            dispatch(addMyEvents(response.data.events))
            setEventsToShow(response.data.events)
            setIsLoaded(true)
        } catch (err) {
            console.log(err)
            setIsLoaded(true)
            // toast.error(err.response.data.message)
        }
    }
    useEffect(() => {
        getUserEvents()
        window.scrollTo(0, 0);
    }, [])

    return (
        <div class="relative h-full w-full bg-slate-900 -mt-10">
            <div class="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div class="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div className="min-h-screen w-full font-poppins bg-black">
                <h1 className="font-bold text-5xl text-center text-white py-5  ">
                    My Events
                </h1>
                <div className={`bg-black  font-poppins items-center flex justify-center pb-5`}>
                    <div className="  flex mb-9  flex-wrap gap-10  justify-center">
                        {eventsToShow.length > 0
                            ? eventsToShow.map((event) => (
                                <Cards key={event._id} event={event} fromCart={false} />
                            ))
                            : !isLoaded ? [0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
                                return (

                                    <div
                                        key={index}
                                        className="col-span-12 sm:col-span-4 h-[350px] w-[300px] bg-gray-200 rounded-lg animate-pulse"
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
                            }) : <div className='w-full gap-2 flex flex-col font-bold text-xl items-center' ><p>You have not participated in any Event</p>
                                <Link className=' cursor-pointer bg-white text-black px-2 py-1 rounded-md hover:no-underline hover:text-violet-700 transition-all duration-200 ' to={'/events'}>Explore Now</Link></div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
