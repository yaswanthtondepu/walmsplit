import React from "react";
import { useEffect, useState, useCallback } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import axios from "axios";
import Extension from "../components/Extension";
import NewSitePopup from "../components/NewSitePopup";
import BackDrop from "../components/BackDrop";
import { useLocalStorage } from "../components/useLocalStorage";




export const WelcomePage = () => {

  const [accessToken, setAccessToken] = useState("");
  const [showExtension, setShowExtension] = useState(true);
  let showPopup;
  const [showNewSitePopup, setShowNewSitePopup] = useLocalStorage(showPopup, true);
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    message: "",
  });

  useEffect(() => {
    const access_token = localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : "";
    setAccessToken(access_token);
  }, [])

  const navigateAway = useCallback(() => {
    setShowNewSitePopup(true)
  }, [setShowNewSitePopup])

  useEffect(() => {
    // if user navigates away to a completely different site
    // or refreshes the page etc
    window.addEventListener("beforeunload", navigateAway);

    // show popup again if user navigates to another page on the same site
    // return () => {
    //   navigateAway();
    //   window.removeEventListener("beforeunload", navigateAway);
    // };
  }, [showPopup, navigateAway]);


  function onLogutClick() {
    setAccessToken("");
  }

  function submitContactUsForm(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://formbold.com/s/9kP4P",
      data: inputs,
    })
      .then((r) => {
        setInputs({
          email: "",
          name: "",
          message: "",
        });
        alert("Thank you for contacting us. We have got your message.");
      })
      .catch((r) => {
        console.log(r);
        alert("Something went wrong. Please try again later.");
      });
  }

  const handleOnChange = (event) => {
    event.persist();
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="relative">
      <Nav onLogutClick={onLogutClick} />

      {showNewSitePopup &&
        <>
          <BackDrop />
          <NewSitePopup setShowNewSitePopup={setShowNewSitePopup} />
        </>
      }

      <div className="font-bold text-6xl text-center py-80 shadow-lg bg-black text-white ">
        <Extension showExtension={showExtension} setShowExtension={setShowExtension} />
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
            </a>}
        </div>
      </div>

      <div className="font-bold text-6xl text-center py-10 ">Contact Us</div>

      <div className="w-3/5 my-40 mx-auto ">
        <form onSubmit={submitContactUsForm}>
          <label className="pl-2 font-semibold ">Name</label>
          <input type="text" placeholder="Name" title="name"
            name="name"
            onChange={handleOnChange}
            value={inputs.name}
            className=" border w-full h-10 rounded-md mb-3 pl-2 "
          />

          <label className="pl-2 font-semibold">Email address</label>
          <input type="email" title="email" placeholder="Email"
            name="email"
            onChange={handleOnChange}
            value={inputs.email}
            className=" border w-full h-10 rounded-md mb-3 pl-2"
          />

          <label className="pl-2 font-semibold"> Describe Your Suggestion </label>
          <textarea title="suggestion"
            name="message"
            placeholder="Please enter your suggestion here"
            onChange={handleOnChange}
            value={inputs.message}
            className=" border  resize-none w-full h-40 rounded-md mb-3 pl-2 pt-2" />
          <button type="submit" className="bg-black text-white p-2 w-full mt-4 rounded-md font-semibold outline-none hover:bg-white ">
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
