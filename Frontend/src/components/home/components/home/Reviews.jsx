import React from "react";
import { Link } from "react-router-dom";
import robertPhoto from "../../../../assets/imgs/robert-brown.png";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function Reviews() {
  return (
    <section
      id="Reviews"
      className="relative overflow-hidden py-20 md:py-40 bg-white"
    >
      {/* Illustration behind content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -mb-32"
        aria-hidden="true"
      >
        <svg
          width="1760"
          height="518"
          viewBox="0 0 1760 518"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-02"
            >
              <stop stopColor="#71c5ee" offset="0%" />
              <stop stopColor="#025091" offset="77.402%" />
              <stop stopColor="#0f172aF" offset="100%" />
            </linearGradient>
          </defs>
          <g
            transform="translate(0 -3)"
            fill="url(#illustration-02)"
            fillRule="evenodd"
          >
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div>

      <div
        className="absolute left-1/2 top-0 transform  -translate-x-1/2   pointer-events-none -mb-32"
        aria-hidden="true"
      >
        <svg
          width="1760"
          height="518"
          viewBox="0 0 1760 518"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-02"
            >
              <stop stopColor="#71c5ee" offset="0%" />
              <stop stopColor="#025091" offset="77.402%" />
              <stop stopColor="#0f172aF" offset="100%" />
            </linearGradient>
          </defs>
          <g
            transform="translate(0 -3)"
            fill="url(#illustration-02)"
            fillRule="evenodd"
          >
            <circle cx="1630" cy="128" r="128" />
            <circle cx="178" cy="481" r="40" />
          </g>
        </svg>
      </div>

      <div className="max-w-[1800px] w-full mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <header className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h2 className="text-3xl font-bold !font-sans mb-5 lg:mb-10 lg:text-4xl text-orange-600 drop-shadow-md">
              Say Goodbye to Traditional Banking with E-Bank
            </h2>
            <p
              className="text-xl !font-sans text-gray-600"
              data-aos="zoom-y-out"
            >
              With over 20,000 satisfied clients all over Egypt, E-Bank is the
              ultimate banking solution for a fast, secure, and convenient
              banking experience. Say goodbye to long queues, paperwork, and
              outdated systems. Our innovative technology and personalized
              service make banking easier and more enjoyable than ever. Join the
              E-Bank revolution today and take control of your finances.{" "}
            </p>
          </header>

          {/* Testimonials */}
          <div className="max-w-3xl mx-auto mt-20" data-aos="zoom-y-out">
            <div className="relative flex items-start border-x-4 border-blue-800 rounded shadow">
              {/* Testimonial */}
              <div className="text-center md:px-12 py-20 md:pt-20 mx-4 md:mx-0">
                <div className="absolute top-0 -mt-8 left-1/2 transform -translate-x-1/2">
                  <svg
                    className="absolute top-0 right-0 -mt-3 -mr-8 w-16 h-16 fill-current text-blue-800"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z" />
                  </svg>
                  <img
                    className="relative rounded-full"
                    src={robertPhoto}
                    width="96"
                    height="96"
                    alt="Robert Brown"
                  />
                </div>

                <blockquote className="text-xl font-medium mb-4 flex items-center justify-center">
                  {" "}
                  <span className="text-orange-500">
                    {" "}
                    <FaQuoteLeft size={30} className="mr-2" />{" "}
                  </span>{" "}
                  E-Bank has made banking so easy for me! The multiple account
                  feature is wonderful, and I can transfer, withdraw, and
                  deposit money anywhere and anytime. The support service is
                  also top-notch, always ready to assist with any questions or
                  concerns. E-Bank has truly revolutionized the way I manage my
                  finances.{" "}
                  <span className="text-orange-500">
                    {" "}
                    <FaQuoteRight size={30} className="ml-2" />{" "}
                  </span>{" "}
                </blockquote>
                <cite className="block font-bold text-lg not-italic mb-1">
                  Robert Brown
                </cite>
                <div className="text-gray-600">
                  <span>CEO & Co-Founder</span>{" "}
                  <a className="text-blue-600 hover:underline" href="#0">
                    @FakeCO
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center my-5">
              <Link
                to="/register"
                className="flex justify-center items-center font-bold text-xl bg-teal-800 text-white hover:bg-white focus:bg-white  px-8 py-4  hover:text-blue-800 focus:text-blue-800 border-2  border-teal-800 hover:border-blue-800  focus:border-blue-800  rounded-lg
                shadow transition-all ease-in-out duration-300"
              >
                <span>Register</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
