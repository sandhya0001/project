import React from "react";
import "./Footer.css";
import logo from "../assests/logo.png";
export default function Footer() {
  return (
    <>
      <div className="footer-section full font-poppins">
        <div className="container md:w-10/12">
          <div className="flex md:flex-row flex-col gap-10 items-start md:justify-between md:items-center">
            <div className="flex md:flex-row flex-col gap-x-10 gap-y-3 items-start justify-start">
              <div className="text-center">
                <img
                  src={logo}
                  alt="Ecommerce Logo"
                  className="image-footer w-20 md:w-50"
                />
              </div>
              <div className="text-center flex flex-col items-start  gap-2">
                <p className="footer-paragraph font-semibold">Get in Touch</p>
                <a
                  className="footer-heading text-base text-white no-underline"
                  href="mailto:meshreyasingh08@gmail.com"
                >
                  meshreyasingh08@gmail.com
                </a>
                <a
                  className="footer-heading text-base text-white no-underline"
                  href="callto:6202079144"
                >
                  +91 6202079144
                </a>
                {/* <h1 className="footer-heading">darpan@aec.ac.in</h1> */}
              </div>
            </div>
            {/* <div className="col-12 col-md-6 col-lg-3">
              <h1 className="footer-heading-title font-semibold">
                Get to Know us
              </h1>
              <p className="footer-title font-medium">About us</p>
              <p className="footer-title font-medium">FAQs</p>
              <p className="footer-title font-medium">Press Releases</p>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <h1 className="footer-heading-title font-semibold ">
                Quick Links
              </h1>
              <p className="footer-title font-medium">Home</p>
              <p className="footer-title font-medium">Events</p>
              <p className="footer-title font-medium">Contacts</p>
            </div> */}
            <div className="flex flex-col items-start">
              <h1 className="font-bold text-xl md:text-2xl italic">#OJAS'X24</h1>
              <div className="text-center p-3">
                
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs">© 2024|All Rights Reserved</p>
      </div>
    </>
  );
}
