import React, { useRef } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import ctmstyle from './Extension.module.css'

const Extension = ({ showExtension, setShowExtension }) => {
    const extensionRef = useRef(null);
    const displayRef = useRef(null);
    const toggleExtesnion = () => {
        setShowExtension(!showExtension);
        extensionRef.current.style.width = showExtension ? "50px" : "350px";
        extensionRef.current.style.padding = showExtension ? "0px" : "10px";
        displayRef.current.style.display = showExtension ? "none" : "block";
        console.log(extensionRef.current.style.width);
    }
    return (
        <div className={ctmstyle.ext} ref={extensionRef}>
            <div className='flex items-center gap-3'>
                <div ref={displayRef}>
                    <img src='images/extension-icon.jpg' alt='walmsplit' style={{ width: "70px", height: "70px", borderRadius: "10px" }} />
                </div>

                <div ref={displayRef}>
                    <p>Checkout our</p>
                    <p>extension {" "}
                        <a
                            href='https://chrome.google.com/webstore/detail/walmart-split/ceenacoabhkcgccagmbchmcoaidhchcg'
                            target='_blank'
                            rel="noreferrer"
                        >
                            here
                        </a>
                    </p>
                </div>
                <div>
                    {!showExtension && <IoIosArrowForward style={{ fontSize: "50px", cursor: "pointer", marginLeft: "-15px" }} onClick={toggleExtesnion} />}
                    {showExtension && <IoIosArrowBack style={{ fontSize: "50px", cursor: "pointer" }} onClick={toggleExtesnion} />}
                </div>
            </div>
        </div>
    )
}

export default Extension