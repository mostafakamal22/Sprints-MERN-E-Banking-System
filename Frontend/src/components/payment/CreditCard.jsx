import React from "react";

export const CreditCard = () => {
  return (
    <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
      <div className="col-span-4">
        <label
          htmlFor="card-number"
          className="block text-sm font-medium text-gray-700"
        >
          Card number
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="card-number"
            autoComplete="cc-number"
            className="block w-full p-1  border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div className="col-span-4">
        <label
          htmlFor="name-on-card"
          className="block text-sm font-medium text-gray-700"
        >
          Name on card
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name-on-card"
            autoComplete="cc-name"
            className="block w-full p-1  border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div className="col-span-3">
        <label
          htmlFor="expiration-date"
          className="block text-sm font-medium text-gray-700"
        >
          Expiration date (MM/YY)
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="expiration-date"
            autoComplete="cc-exp"
            className="block w-full p-1  border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="cvc"
          className="block text-sm font-medium text-gray-700"
        >
          CVC
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="cvc"
            autoComplete="csc"
            className="block w-full p-1  border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
      </div>
    </div>
  );
};
