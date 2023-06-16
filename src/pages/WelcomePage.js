import React from "react";
import { useEffect } from "react";
import Nav from "../components/Nav";
import { useState } from "react";
import { Link } from "react-router-dom";

export const WelcomePage = () => {

  const[accessToken,setAccessToken] = useState("");

  useEffect(() => {
    const access_token = localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : "";
    setAccessToken(access_token);
  }, [])

  function onLogutClick () {
    setAccessToken("");
  }

  function submitContactUsForm(e) {
    e.preventDefault();
    alert("Sorry, this feature is not available yet.");
  }
  
  return (
    <div>
      <Nav onLogutClick={onLogutClick}/>
      <div className="font-bold text-6xl text-center py-80 shadow-lg bg-black text-white ">
        An Easy way to Manage your Expenses
        <div>
          {accessToken ?
          <Link to="/home" className="hoverbutton white ">Get Started</Link>
          :
          <a
            href={
                `https://secure.splitwise.com/oauth/authorize?response_type=token&client_id=${process.env.REACT_APP_SPLITWISE_API_TOKEN}`
            }
            className="hoverbutton white "
          >
            {" "}
            Signin with Splitwise to Get started
            </a> }
        </div>
      </div>
    
      <div className="font-bold text-6xl text-center py-10 ">Contact Us</div>

      <div className="w-3/5 my-40 mx-auto ">
        <form onSubmit={submitContactUsForm}>
          <label className="pl-2 font-semibold ">Name</label>
          <input type="text" placeholder="Name" title="name" className=" border w-full h-10 rounded-md mb-3 pl-2 " />
          <label className="pl-2 font-semibold">Email address</label>
          <input type="email" title="email" placeholder="Email" className=" border w-full h-10 rounded-md mb-3 pl-2" />
          <label className="pl-2 font-semibold"> Describe Your Suggestion </label>
          <textarea title="suggestion" placeholder="Please enter your suggestion here" className=" border  resize-none w-full h-40 rounded-md mb-3 pl-2 pt-2" />
          <button type="submit" className="bg-black text-white p-2 w-full mt-4 rounded-md font-semibold outline-none hover:bg-white ">
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
