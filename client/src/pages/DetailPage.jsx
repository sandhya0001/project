import React, { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { addToCart, removeFromCart } from "../store/cartSlice";
import Cards from "../components/Cards"
function DetailPage() {
  const navigate = useNavigate()
  const events = useSelector(state => state.events);
  const dispatch = useDispatch()
  const [isBought, setIsBought] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const cartEvents = useSelector(state => state.cart)
  const myEvents = useSelector(state => state.myEvents)
  const { eventId } = useParams();
  const [event, setEvent] = useState(null)
  const [similarEvent, setSimilarEvent] = useState(null)
  const getSimilarEvents = () => {
    const allEventOfCategory = events?.filter((e) => e?.category === event?.category)
    const similarevent=allEventOfCategory.filter((e)=>e?._id!==event._id)
    setSimilarEvent(similarevent)
  }
  const getEventDetails = () => {
    const pageEvent = events?.find(event => event?._id === eventId);
    setEvent(pageEvent)
  }
  const checkIsBought = () => {
    if (myEvents?.some((myEvent) => myEvent?._id === event?._id)) {
      setIsBought(true)
    }else{
      setIsBought(false)
    }
  }
  const isPresentInCart = () => {
    if (cartEvents?.some((cartEvent) => cartEvent?._id === event?._id)) {
      setAddedToCart(true)
    }else{
      setAddedToCart(false)
    }
  }
  const handleAddToCart = () => {
    dispatch(addToCart(event))
    setAddedToCart(true)
  }
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(event))
    setAddedToCart(false)
  }
  const handleRegister = () => {
    if (!addedToCart) {
      handleAddToCart();
    }
    navigate("/mycart")
  }
  useEffect(() => {
    if (eventId) {
      getEventDetails();
      window.scrollTo(0, 0);
      getSimilarEvents();
    }
  }, [eventId, events]); // Include dependencies

  useEffect(() => {
    console.log(eventId)
    if (event?._id) {
      checkIsBought();
      isPresentInCart();
      getSimilarEvents();
    }
  }, [cartEvents, myEvents, event,eventId]);
  return (
    <div className=" flex flex-col items-center min-h-screen  justify-start py-5">
      <div className="w-screen flex  justify-center ">
        {/* card */}
        <div className="card lg:card-side w-[1300px]  bg-neutral-900 shadow-xl">
          <figure className="min-w-[300px]">
            <img className="w-[240px] h-[300px]"
              src={event?.poster}
              alt="Album"
            />
          </figure>
          <div className="card-body px-3 md:px-8">
            <h2 className="card-title">{event?.event_name}</h2>
            {/*  */}
            <Tabs aria-label="Options">
              <Tab key="about" title="About">
                <Card>
                  <CardBody>
                    {
                      event?.about
                    }
                  </CardBody>
                </Card>
              </Tab>
              {/* <Tab key="contact" title="Contact">
                <Card>
                  <CardBody>
                    <span>{event?.event_managers?.name}</span> <a className=" hover:text-white hover:no-underline" href={`tel:+91${event?.event_managers?.mobile}`}>{event?.event_managers?.mobile}</a>
                  </CardBody>
                </Card>
              </Tab> */}
              <Tab key="Prize" title="Prize">
                <Card>
                  <CardBody >
                    <p className="flex items-center gap-2">Winner: <span className="flex items-center "><FaRupeeSign />{event?.winner_prize}</span></p>
                    <p className="flex items-center gap-2">Runner Up: <span className="flex items-center "><FaRupeeSign />{event?.runnerup_prize}</span></p>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
            {/*  */}
            {
              isBought ?
                <div className="card-actions justify-end">
                  
                  <Button onClick={() => {
                  toast.success("Already Enrolled")
                }}
                  className=" w-fit text-[15px] text-white hover:bg-opacity-80 bg-black opacity-65"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="sm"
                >Enrolled
                </Button> </div> : <div className="card-actions justify-between items-center">
                <span className="flex items-center bg-red-500 px-2 py-1 rounded-full z-50"><FaRupeeSign />{event?.registration_price}</span>
                <div className="card-actions  justify-end">

                
                  {
                    addedToCart ? <button onClick={handleRemoveFromCart} className="btn btn-error sm:text-base text-xs font-bold">Remove From Cart</button> : <button onClick={handleAddToCart} className="btn btn-primary sm:text-base text-xs font-bold">Add to Cart</button>
                  }

                  <button onClick={handleRegister} className="btn btn-primary sm:text-base text-xs font-bold">Register</button>
                </div>
                </div>
            }

          </div>
        </div>
      </div>

      {/* details */}
      {/* <div className="flex sm:w-[750px] lg:w-[1660px] md:px-52 mt-3 flex-col">
        <Tabs aria-label="Options">
          <Tab key="about" title="About">
            <Card>
              <CardBody>
                {
                  event?.about
                }
               </CardBody>
            </Card>
          </Tab>
          <Tab key="contact" title="Contact">
            <Card>
              <CardBody>
                <span>{event?.event_managers?.name}</span> <span>{event?.event_managers?.mobile}</span>
                </CardBody>
            </Card>
          </Tab>
          <Tab key="videos" title="Videos">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolorem excepturi, eligendi quos doloribus officia minus vero, odit quis expedita consequuntur aspernatur animi quisquam iure maiores nemo explicabo tenetur facere. Quis aliquam architecto maiores non aut iure voluptatibus sapiente sint cumque dolor, quia sit eius porro vel enim adipisci quidem velit fugit laudantium. Optio porro quibusdam officia minus atque fugiat. Fugiat in accusantium, facilis magnam minima eum ipsum et eligendi similique repudiandae alias omnis dolore esse distinctio! Nostrum, ratione. Adipisci consequatur voluptatem quae sint, magni dolore fugit deserunt aperiam numquam laboriosam obcaecati dolorem et distinctio labore ducimus harum voluptate rem!
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div> */}

      <div className="w-10/12 gap-10 mt-28 flex flex-col">
        <h1 className="text-3xl font-bold">Similar Events:</h1>
        <div className="flex flex-wrap gap-4">{similarEvent?.map((event)=>{
          return <Cards key={event?._id} event={event} />
        })}</div>
      </div>
      
    </div>
  );
}

export default DetailPage;
