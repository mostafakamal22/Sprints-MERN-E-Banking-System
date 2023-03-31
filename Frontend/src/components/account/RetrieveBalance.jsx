import React, { useEffect, useState } from "react";
import { FcDebt } from "react-icons/fc";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { PaymentMethods } from "../payment/PaymentMethods";
import FormButton from "../shared/FormButton";
import MessagesContainer from "../shared/MessagesContainer";

export const RetrieveBalance = () => {
  const naviagte = useNavigate();
  //state for alert messages
  const [msg, setMsg] = useState("");

  //state for isSuccess
  const [isSuccess, setIsSuccess] = useState(false);

  //Get initial balance from state
  const location = useLocation();
  const intialBalance = location?.state;

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSuccess(true);

    setMsg(
      `You Have Retrieved ${new Intl.NumberFormat("ar-EG", {
        style: "currency",
        currency: "EGP",
      }).format(intialBalance)} Successfully!`
    );
  };

  useEffect(() => {
    if (!intialBalance) {
      naviagte("/");
    }
  }, [intialBalance]);

  if (intialBalance)
    return (
      <div className="max-w-5xl w-full">
        <h3 className="flex justify-center items-center text-xl  sm:text-2xl text-center font-bold px-2 py-4 mb-10 bg-blue-200 border-b-4 border-blue-800 rounded shadow ">
          <FcDebt className="mr-1" size={50} />
          Retrieve Your Balance
        </h3>
        <form onSubmit={handleSubmit}>
          <p className="text-base  text-center font-semibold !font-sans px-2 py-4 mb-10 bg-blue-200 border-b-4 border-blue-800 rounded shadow ">
            Your initial balance was{" "}
            {new Intl.NumberFormat("ar-EG", {
              style: "currency",
              currency: "EGP",
            }).format(intialBalance)}
          </p>

          <PaymentMethods title="Retrieve Methods" />

          {/*Request Status and Errors*/}
          {isSuccess && <MessagesContainer msg={msg} isSuccess={isSuccess} />}

          {/*form button */}
          <FormButton
            text={{ default: "Retrieve" }}
            icon={<RiMoneyPoundCircleFill className="ml-1" size={25} />}
          />
        </form>
      </div>
    );
};
