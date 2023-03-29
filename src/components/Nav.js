import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Nav = () => {
    const [accessToken, setAccessToken] = useState("");
    const [currentUser, setCurrentUser] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const showPopupFn = () => {
        setShowPopup(true);
    }
    const hidePopup = () => {
        setShowPopup(false);
    }

    useEffect(() => {
        const access_token = localStorage.getItem("access_token")
            ? localStorage.getItem("access_token")
            : "";
        setAccessToken(access_token);
    }, [])

    useEffect(() => {
      accessToken &&  axios
            .get(`${process.env.REACT_APP_URL}/get_current_user`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res, err) => {
                if (res) {
                    setCurrentUser(res.data);
                }
                if (err) {console.log(err); window.location.href = "/"};
            });
    }, [accessToken])
    const Logout = () => {
        localStorage.clear()
        navigate("/");
    }
    return (
        <div className="bg-white p-4  sticky z-10 top-0 shadow-md left-0 right-0 text-center  border-b align-center" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div style={{ flex: 2, display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <Link to="/" style={{ textDecoration: "none", color: "black", paddingLeft:"5rem" }} className="text-2xl bold font-bold"> WALMART SPLIT</Link>
            </div>
            {currentUser &&
                <div onMouseEnter={showPopupFn} onMouseLeave={hidePopup} style={{ cursor: "pointer" }}>
                <div style={{display:"flex", gap:"0.5rem", alignItems:"center"}}>
                        <div style={{ backgroundColor: "black", color: "white", borderRadius: "50%", height: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center"}}>{currentUser?.name?.slice(0,1) }</div>
                    <div className='font-semibold'>Howdy, {currentUser.name }</div>
                </div>
                {showPopup && <div style={{ position: "absolute", background:"white", padding:"1rem", zIndex:"10", right:"0px", fontSize:"22px" }} className="shadow-md"> <div onClick={Logout} >
                    <button className="hoverbutton dark ">Logout from Splitwise</button>
                    </div></div>}</div>
            }
           
        </div>
    )
}

export default Nav