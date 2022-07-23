import React from "react";
import { useState } from "react";
import { CreditCard } from "./CreditCard";
import { VodafoneCash } from "./VodafoneCash";

const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "vodafoneCash", title: "Vodafone Cash" },
];

export const PaymentMethods = ({ title }) => {
  //state for payment methods
  const [method, setMethod] = useState(paymentMethods[0].title);
  return (
    <div className="my-10 rounded shadow bg-white p-10">
      {/* Heading */}
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>

      {/* Choose Method */}
      <fieldset className="mt-4">
        <legend className="sr-only">Payment type</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
            <div key={paymentMethod.id} className="flex items-center">
              <input
                name="payment-type"
                type="radio"
                onChange={() =>
                  setMethod(paymentMethods[paymentMethodIdx].title)
                }
                defaultChecked={paymentMethodIdx === 0}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-200"
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
      {method === paymentMethods[0].title && <CreditCard />}
      {method === paymentMethods[1].title && <VodafoneCash />}
    </div>
  );
};
