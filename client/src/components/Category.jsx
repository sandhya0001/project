import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const category = [
  {
    image: "https://i.pinimg.com/564x/07/e2/f2/07e2f21823f78b1d4ece115f630f88a0.jpg",
    category: "Gaming"
  },
  {
    image: "https://i.pinimg.com/564x/3f/a7/23/3fa723982fd6ae41cadb06bf9453e4d9.jpg",
    category: "Coding"
  },
  {
    image: "https://i.pinimg.com/564x/39/7a/5b/397a5bface98c898415b1d2ef23be923.jpg",
    category: "Engineering"
  },
  {
    image: "https://i.pinimg.com/736x/12/1f/98/121f9882e5f727eb46ef503b59cd3f48.jpg",
    category: "Art"
  },
  {
    image: "https://i.pinimg.com/564x/20/ef/69/20ef699a6c3f46ecfb07e99d2f167e4d.jpg",
    category: "Entertainment"
  }
];

const Category = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const index = currentIndex === 0 ? category.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = currentIndex === category.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  return (
    <div className="w-full my-9 flex flex-col items-center font-poppins">
      <h1 className="font-bold text-3xl sm:text-5xl text-white mb-5">Explore</h1>
      <div className="relative w-fit mb-3 flex items-center justify-center">
        <Button
          onClick={prevSlide}
          className="absolute left-0 bg-gray-700 bg-opacity-50 z-30 text-white rounded-3xl focus:outline-none"
        >
          <IoIosArrowBack className="text-lg" />
        </Button>
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src={category[(currentIndex - 1 + category.length) % category.length].image}
              alt="prev"
              className="w-72 h-64 sm:h-[350px] opacity-70 transform transition-transform duration-700 scale-100 rounded-3xl"
            />
          </div>
          <Link to={`category/${category[currentIndex].category}`} className="-ml-5 -mr-14 z-20 relative">
            <h1 className="absolute left-1 transform -translate-x-1/2 top-1/2 z-30 -rotate-90 text-white text-4xl font-bold">
              {category[currentIndex].category}
            </h1>
            <img
              src={category[currentIndex].image}
              alt="main"
              className="w-[580px] sm:w-96 h-72 sm:h-96 transform transition-transform duration-700 scale-105 -ml-5 -mr-5 z-20 rounded-3xl"
            />
          </Link>
          <div className="relative">
            <img
              src={category[(currentIndex + 1) % category.length].image}
              alt="next"
              className="w-72 h-64 sm:h-[350px] opacity-70 transform transition-transform duration-700 scale-100 rounded-3xl"
            />
          </div>
        </div>
        <Button
          onClick={nextSlide}
          className="absolute right-0 p-2 bg-gray-700 bg-opacity-50 z-20 text-white rounded-full focus:outline-none"
        >
          <IoIosArrowForward className="text-lg" />
        </Button>
      </div>
   
    </div>
  );
};

export default Category;
