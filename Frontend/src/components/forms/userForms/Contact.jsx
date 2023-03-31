import React from "react";
import { FcServices } from "react-icons/fc";
import { RiMessageFill } from "react-icons/ri";
import FormButton from "../../shared/FormButton";

export const Contact = () => {
  return (
    <div className="max-w-4xl w-full">
      <h3 className="flex justify-center items-center text-2xl sm:text-3xl mb-10 p-4 text-center font-bold bg-blue-200 text-gray-900 border-b-4 border-blue-800 rounded shadow">
        <FcServices size={55} className="mr-1" />
        Contact Our Support!
      </h3>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Please input Your Name"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Please input Email Address"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="w-full inline-block font-semibold mb-4 p-2 text-gray-800 border-b-4 border-blue-800 rounded shadow bg-blue-200"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="h-36 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none resize-none"
          />
        </div>

        {/*form button */}
        <FormButton
          text={{ default: "Send Message" }}
          icon={<RiMessageFill className="ml-1" size={25} />}
        />
      </form>
    </div>
  );
};
