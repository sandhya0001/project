import React, { useState } from "react";
import { FaChevronCircleDown } from "react-icons/fa";
import { FaChevronCircleUp } from "react-icons/fa";
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: `What are the prerequisites to join OJAS'X?`,
      answer: `To participate in OJAS'X, you must register for at least one event. This registration is mandatory and ensures your eligibility to take part in the fest's activities.`,
    },
    {
      question: `Are the registration charges for OJAS'X refundable if I decide not to participate or can not attend?`,
      answer: `No, the registration charges for OJAS'X are non-refundable. Once you have registered for the event, the fees cannot be refunded, regardless of your participation status. Please ensure your availability and commitment before registering.`,
    },
  ];

  return (
    <div className="max-w-4xl font-poppins mx-auto p-4">
      <h2 className="md:text-4xl text-3xl font-poppins font-semibold mb-4">
        FAQ<span className="text-2xl">S</span>
      </h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <div
            onClick={() => toggleAnswer(index)}
            className="w-full cursor-pointer text-left bg-black shadow-md shadow-white p-4 f rounded-md"
          >
            <span className="md:text-lg text-[14px] font-medium">
              {faq.question}
            </span>
            <span className="float-right text-xl md:text-2xl">
              {activeIndex === index ? (
                <FaChevronCircleUp />
              ) : (
                <FaChevronCircleDown />
              )}
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-700 ${activeIndex === index
                ? " md:max-h-[150px] max-h-[250px]"
                : "max-h-0"
              }`}
          >
            <div className="bg-black md:text-base text-[15px] p-4 rounded-md shadow-md mt-2">
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
