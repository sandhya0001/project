/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { BsFillHandbagFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { toast } from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
export default function App({ event, fromCart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isBought, setIsBought] = useState(false);
  const myEvents = useSelector(state => state.myEvents)
  const cart = useSelector((state) => state.cart);
  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
    if (cart.some((cartEvent) => cartEvent._id === event._id)) {
      setAddedToCart(true)
    }
    if (myEvents.some((myEvent) => myEvent._id === event._id)) {
      setIsBought(true)
    }
  }, [myEvents])

  function handleRemoveFromCart() {
    dispatch(removeFromCart(event))
    toast.success("Event Removed from Cart")
  }
  function handleAddToCart() {
    if (cart.some((cartEvent) => cartEvent._id === event._id)) {
      // toast.success("Already Present in Cart")
      navigate('/mycart')
      return;
    }
    dispatch(addToCart(event));
    toast.success("Event Added to Cart")
    setAddedToCart(true)
  }

  return (
      <Card className="col-span-12 relative sm:col-span-4 h-[300px] w-[240px]">
        {/* <CardHeader className="absolute z-20 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            What to watch
          </p>
          <h4 className="text-black font-medium text-large">
            Stream the Acme event
          </h4>
        </CardHeader> */}
        <Link to={`/event/${event._id}`}>
          <Image
            isZoomed
            width={240}
            alt=""
            src={event.poster}
          />
        </Link>
        <CardFooter className=" justify-between bg-black font-poppins  bg-opacity-50 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl  bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Link className="text-white hover:no-underline" to={`/event/${event._id}`}>
            <p className="text-small text-white font-semibold">{event.event_name}</p>
          </Link>
          {
            !isBought ? <div className="z-40"> {
              fromCart ? <Button
                onClick={handleRemoveFromCart}
                className="text-tiny text-white hover:bg-opacity-80 bg-black opacity-65"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                <MdDeleteSweep className=" text-white sm:w-5 sm:h-5 w-5 h-5" />
              </Button> : <Button
                onClick={handleAddToCart}
                className="text-tiny text-white hover:bg-opacity-80 bg-black opacity-65"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                {addedToCart ? <FaArrowRight className=" text-white sm:w-5 sm:h-5 w-5 h-5" /> : <FaCartArrowDown className=" text-white sm:w-5 sm:h-5 w-5 h-5" />}
              </Button>
            }</div> : <Button
              className="text-tiny text-white hover:bg-opacity-80 bg-black opacity-65"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >Enrolled
            </Button>
          }



        </CardFooter>
      
      
      <span className="absolute top-0 right-0 flex items-center bg-red-500 px-2 py-1 rounded-l-full z-40"><FaRupeeSign />{event?.registration_price}</span>
      </Card>
    
  );
}
