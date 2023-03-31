import React from "react";
import { useState } from "react";
import { CreditCard } from "./CreditCard";
import { VodafoneCash } from "./VodafoneCash";

const paymentMethods = [
  { id: "vodafoneCash", title: "Vodafone Cash" },
  { id: "credit-card", title: "Credit card" },
];

export const PaymentMethods = ({ title }) => {
  //state for payment methods
  const [method, setMethod] = useState(paymentMethods[0].title);
  return (
    <div className="p-2 mb-5">
      {/* Heading */}
      <h3 className="text-base font-semibold text-gray-900 p-2 bg-blue-200 border-r-4 border-blue-900 shadow-lg rounded">
        {title}
      </h3>

      {/* Choose Method */}
      <fieldset className="mt-4">
        <legend className="sr-only">Payment type</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
            <div key={paymentMethod.id} className="flex items-center">
              <input
                name="payment-type"
                id={paymentMethod.id}
                type="radio"
                onChange={() =>
                  setMethod(paymentMethods[paymentMethodIdx].title)
                }
                defaultChecked={paymentMethodIdx === 0}
                className="focus:ring-indigo-500 accent-pink-500 h-4 w-4 text-indigo-600 border-gray-200"
                required
              />

              <label
                htmlFor={paymentMethod.id}
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                {paymentMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <p className="text-xs font-bold my-2 underline text-blue-500">
        *All Payments Methods Are FAKE Just Type Any Values.
      </p>

      {/* Methods inputs Details */}
      {method === paymentMethods[0].title && <VodafoneCash />}
      {method === paymentMethods[1].title && <CreditCard />}
    </div>
  );
};
