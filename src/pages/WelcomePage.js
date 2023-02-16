import React from "react";
import { useEffect, createContext } from "react";

export const WelcomePage = () => {
  return (
    <div>
      <div className="bg-white p-4 text-2xl  z-10 top-0  left-0 right-0 text-center bold border-b font-bold">
        WALMART SPLIT
      </div>
      <div className="font-bold text-6xl text-center py-80 shadow-lg bg-black text-white ">
        An Easy way to Manage your Expenses
      </div>
      <a
        href={
          "https://secure.splitwise.com/oauth/authorize?response_type=token&client_id=4tGEaqs85zHc7rjbodKXuAG7xuYT4QCpTddEdUtP"
        }
        className="hoverbutton dark "
      >
        {" "}
        Signin with Splitwise to Get started
      </a>
      <div className="font-bold text-6xl text-center py-10 ">Contact Us</div>

      <div className="w-3/5 my-40 mx-auto ">
        <label className="pl-2 font-semibold ">Name</label>
        <input className=" border w-full h-10 rounded-md mb-3 pl-2 " />
        <label className="pl-2 font-semibold">Email address</label>
        <input className=" border w-full h-10 rounded-md mb-3 pl-2" />
        <label className="pl-2 font-semibold"> Describe Your Suggestion </label>
        <textarea className=" border  resize-none w-full h-40 rounded-md mb-3 pl-2 pt-2" />
        <button className="bg-black text-white w-full p-2 mt-4 rounded-md font-semibold outline-none hover:bg-white ">
          {" "}
          Submit{" "}
        </button>
      </div>
    </div>
  );
};
