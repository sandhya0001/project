import React from "react";
import "./style.css";
import logo from "../../assests/logo.png";
const About = () => {
  return (
    <div className="font-poppins flex justify-center w-full">
      <div className="container md:w-10/12">
        <div className="heading">
          <span>YOU MIGHT BE</span>
          <br />
          <span>THINKING WHAT IS</span>
          <br />
          <span className="heading-blue">
            OJAS'X<span className="heading-white">?</span>
          </span>
        </div>
        <div className="content content-responsive">
          OJAS'X is the annual tech fest organized by our college, where
          students and tech enthusiasts come together to showcase their
          innovations, participate in competitions, attend workshops, and much
          more. It's a platform to connect, learn, and grow. Various events,
          guest lectures, and hands-on activities are planned to make it an
          unforgettable experience. We aim to inspire and challenge
          participants, fostering a spirit of innovation and collaboration. Join
          us to explore the latest in technology and to push the boundaries of
          what’s possible.
        </div>
        <div className="about-section">
          <div className="about-text">
            <h2 className="about-heading font-bold md:font-extrabold">ABOUT</h2>
            <p className="p-responsive">
              OJAS'X is not just an event, it's an experience. From coding
              challenges to robotic competitions, from technical talks to
              hands-on workshops, OJAS'X offers something for everyone. Join us
              to explore the future of technology and unleash your potential.
              The event is designed to cater to various interests and skill
              levels, ensuring there's something for everyone. Whether you're a
              beginner or an expert, you'll find opportunities to learn,
              compete, and showcase your talents.
            </p>
          </div>
          <div className="about-image ">
            <img src={logo} alt="OJAS'X Tech Fest" />
          </div>
        </div>
        <div className="explore overflow-hidden ">
          <div className="explore-text explore-text-1 aimate-text">
            <span className="text-[#9000FF]">EXPLORE AND DISCOVER</span>{" "}
            <span className="text-white">EXPLORE AND DISCOVER</span>{" "}
            <span className="text-[#9000FF]">EXPLORE AND DISCOVER</span>{" "}
            <span className="text-white">EXPLORE AND DISCOVER</span>{" "}
            <span className="text-[#9000FF]">EXPLORE AND DISCOVER</span>{" "}
            <span className="text-white">EXPLORE AND DISCOVER</span>{" "}
            <span className="text-[#9000FF]">EXPLORE AND DISCOVER</span>{" "}
            <span className="text-white">EXPLORE AND DISCOVER</span>
          </div>
          <div className="explore-text explore-text-2 aimate-text-2">
            <span className="text-[#9000FF]">OJAS'X TECH FEST</span>{" "}
            <span className="text-white">OJAS'X TECH FEST</span>{" "}
            <span className="text-[#9000FF]">OJAS'X TECH FEST</span>{" "}
            <span className="text-white">OJAS'X TECH FEST</span>{" "}
            <span className="text-[#9000FF]">OJAS'X TECH FEST</span>{" "}
            <span className="text-white">OJAS'X TECH FEST</span>{" "}
            <span className="text-[#9000FF]">OJAS'X TECH FEST</span>{" "}
            <span className="text-white">OJAS'X TECH FEST</span>{" "}
            <span className="text-[#9000FF]">OJAS'X TECH FEST</span>{" "}
            <span className="text-white">OJAS'X TECH FEST</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
