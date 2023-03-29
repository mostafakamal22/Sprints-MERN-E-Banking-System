import React from "react";
import { ReactComponent as OnlineIcon } from "../../../../assets/icons/icon-online.svg";
import { ReactComponent as OnboardingIcon } from "../../../../assets/icons/icon-onboarding.svg";
import { ReactComponent as BudgetingIcon } from "../../../../assets/icons/icon-budgeting.svg";
import { ReactComponent as ApiIcon } from "../../../../assets/icons/icon-api.svg";

const motivationItems = [
  {
    icon: OnlineIcon,
    title: "Online Banking",
    subtitle:
      "Our modern web and mobile applications allow you to keep track of your finances wherever you are in the world.",
  },
  {
    icon: BudgetingIcon,
    title: "Simple Budgeting",
    subtitle:
      "See exactly where your money goes each month. Receive notifications when you're close to hitting your limits.",
  },
  {
    icon: OnboardingIcon,
    title: "Fast Onboarding",
    subtitle:
      "We don't do branches. Open your account in minutes online and start taking control of your finances right away.",
  },
  {
    icon: ApiIcon,
    title: "Open API",
    subtitle:
      "Manage your savings, investments, pension, and much more from one account. Tracking your money has never been easier.",
  },
];

export default function Motivation() {
  return (
    <section id="About" className="py-20 md:py-40 bg-[#0f172a]">
      <div className="max-w-[1800px] w-full mx-auto flex flex-col justify-center items-center gap-10 px-4 sm:px-10 md:px-12  text-center lg:text-left">
        <div className="grid lg:grid-cols-2 mb-12 lg:mb-16">
          <div className="col-span-1">
            <h2 className="text-3xl font-bold !font-sans lg:text-4xl text-teal-600 pb-5  mb-5">
              {" "}
              Discover the Top Reasons to Bank with{" "}
              <span className="font-extrabold text-orange-500">
                E-Bank
              </span>{" "}
            </h2>
            <p className="text-white !font-sans font-light  text-lg leading-5">
              We leverage Open Banking to turn your bank account into your
              financial hub. Control your finances like never before.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-9 lg:gap-6 lg:grid-cols-4">
          {motivationItems.map((item) => (
            <div key={item.title} className="justify-center">
              <div className="flex justify-center lg:justify-start">
                <item.icon />
              </div>

              <h3 className="text-lg font-semibold text-teal-600 py-4 lg:pt-9 lg:pb-6 lg:text-xl lg:font-bold">
                {item.title}
              </h3>
              <p className="text-white !font-sans text-sm font-light lg:text-base leading-5">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
