import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cards from '../components/Cards'
import { PiCurrencyInrBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { clearCart, removeFromCart } from '../store/cartSlice';
import axios from 'axios';

export default function CartPage() {
    const navigate = useNavigate()
    const [paymentProcessing, setPaymentProcessing] = useState(false)
    const loggedIn = useSelector(state => state.loggedIn)
    const loggedInUser = useSelector(state => state.loggedInUser);
    const [showAlert, setShowAlert] = useState(false);
    const cartEvents = useSelector(state => state.cart);
    const myEvents = useSelector(state => state.myEvents)
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);

    function handleClearCart() {
        dispatch(clearCart());
        setShowAlert(false)
    }

    function checkIsEnrolled() {
        cartEvents.forEach((event) => {
            if (myEvents.some((myEvent) => myEvent._id === event._id)) {
                dispatch(removeFromCart(event));
            }
        });
    }


    const handlePayment = async () => {

        if (!loggedIn) {
            navigate("/login")
            return;
        }
        try {
            setPaymentProcessing(true)
            const url = import.meta.env.VITE_BASE_URL;
            const res = await axios.post(`${url}/order`, { amount: totalAmount }, {
                withCredentials: true
            })
            await handlePaymentVerify(res.data.data);
            setPaymentProcessing(false)
        } catch (error) {
            console.log(error);
            setPaymentProcessing(false)
        }
    }
    const handlePaymentVerify = async (data) => {
        const userId = loggedInUser._id;
        const eventIds = cartEvents.map(event => event._id);
        const events = cartEvents.map(event => ({
            event_name: event.event_name,
            reg_price: event.registration_price,
        }));
        const pdfOptions = {
            name: loggedInUser.name,
            email: loggedInUser.email,
            userId: loggedInUser._id,
            events: events
        }
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            // name: "Manish Jha",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                try {

                    setPaymentProcessing(true)
                    const url = import.meta.env.VITE_BASE_URL;
                    const res = await axios.post(`${url}/verify`, {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        userId,
                        eventIds
                    })
                    if (res.data.success) {

                        const res = await axios.post(`${url}/createPdf`, pdfOptions, {
                            withCredentials: true
                        })
                        const invoice = await axios.post(`${url}/sendPdf`, { email: loggedInUser.email, userId: loggedInUser._id }, {
                            withCredentials: true
                        })
                        // window.open(invoice.data.invoice, '_blank');
                        dispatch(clearCart())
                        console.log(invoice.data.invoice)
                        navigate("/paymentsuccess", { state: { url: invoice.data.invoice, allowed: true } })
                        setPaymentProcessing(false)


                    }
                    const verifyData = res;
                    if (verifyData.message) {
                        toast.success(verifyData.message)
                    }
                } catch (error) {
                    console.log(error);
                    setPaymentProcessing(false)
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    function setAmount() {
        let total = 0;
        cartEvents.forEach((event) => {
            total += event.registration_price;

        });
        setTotalAmount(total)
    }
    useEffect(() => {
        setAmount();

    }, [cartEvents])
    useEffect(() => {
        checkIsEnrolled()
        window.scrollTo(0, 0);
    }, [])



    if (cartEvents.length == 0) {
        return <div className="flex gap-2 w-full min-h-screen flex-col justify-center items-center">
            <h1 className="text-xl font-bold">Your cart is empty</h1>
            <Link
                className="bg-white text-black font-bold no-underline  px-2 py-2 rounded-md"
                to="/"
            >
                Start Exploring
            </Link>
        </div>

    }
    return (
        <div className='flex lg:flex-row flex-col w-screen gap-10 font-poppins justify-between items-start md:px-12 py-10 min-h-screen'>
            <div className='flex flex-wrap gap-3 items-center justify-center overflow-hidden'>
                {
                    cartEvents.map((event) => {
                        return <Cards key={event._id} event={event} fromCart={true} />
                    })
                }
            </div>
            <div className='items-center flex justify-center w-full lg:w-fit '>
                {cartEvents.length > 0 && (
                    <div className="flex items-center flex-col md:w-[300px] ">
                        <h1 className="flex items-center">
                            <p className="md:text-xl font-semibold">
                                Subtotal{`(${cartEvents.length} events):`}
                            </p>{" "}
                            <p className="text-xl md:text-2xl font-bold flex items-center">
                                <PiCurrencyInrBold /> {totalAmount}
                            </p>
                        </h1>
                        <button onClick={handlePayment} className="text-black bg-violet-500 hover:bg-violet-700 transition-all duration-200 font-bold  px-4 py-2 mt-2 rounded-lg w-[200px]">
                            Proceed to Buy
                        </button>

                        <button
                            onClick={() => setShowAlert(true)}
                            className="bg-red-500 hover:bg-red-700 text-black px-3 py-2 mt-2 text-xs rounded-md  transition-all duration-300 font-bold"
                        >
                            Clear Cart
                        </button>
                        <div
                            className={`fixed bg-opacity-85 bottom-1/2 left-[50%] -translate-x-1/2 translate-y-1/2 bg-white text-black z-20 w-[90%] px-2 flex flex-col items-center md:w-[400px] ${showAlert ? "scale-100" : "scale-0"
                                } rounded-md h-[150px] justify-center transition-all duration-200`}
                        >
                            <p className="text-center">Are you sure to Clear the Cart?</p>
                            <div className="flex gap-5 justify-center">
                                <button
                                    onClick={handleClearCart}
                                    className="bg-red-500 hover:bg-red-700 text-black px-3 py-2 w-16 mt-2 text-xs rounded-md font-bold "
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => setShowAlert(false)}
                                    className="bg-red-500 flex justify-center hover:bg-red-700 text-black px-3 py-2 w-16 mt-2 text-xs rounded-md font-bold "
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>




                        <div
                            className={`fixed gap-y-2 bg-opacity-85 bottom-1/2 left-[50%] -translate-x-1/2 translate-y-1/2 bg-white text-black z-20 w-[90%] px-2 flex flex-col items-center md:w-[400px] ${paymentProcessing ? "scale-100" : "scale-0"
                                } rounded-md h-[150px] justify-center transition-all duration-200`}
                        >
                            <p className='text-xl font-bold'>Payment Proccesing...</p>
                            <p className='w-full text-center'>Please do not refreh the page or press the back button</p>
                            <p className='font-bold text-xl'>Thank You</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
