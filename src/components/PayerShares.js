import React from 'react'
import { useState } from 'react';

const PayerShares = ({ payer, payersAndShares, setPayersAndShares, setShowShareModal }) => {
    const modalStyle = {
        width: "300px",
        height: "300px",
        backgroundColor: "#fff",
        zIndex: "99",
        position: "absolute",
        top: "30%",
        left: "35%",
        oveFlow: "auto",
        padding: "10px",
        borderRadius: "10px",
    }
    const [tempPayersAndShares, setTempPayersAndShares] = useState(JSON.parse(JSON.stringify(payersAndShares)));
    return (
        <div style={modalStyle}>
            <div className='pl-2 h-52 overflow-auto'>
                {payer.map((p, i) => {
                    return (
                        <div key={i}>
                            <div className='pt-2 pb-2'>{p.label}</div>
                            <input type="number"
                                placeholder={`Share of ${p.label}`}
                                style={{
                                    border: "1px solid black",
                                    padding: "5px",
                                    outline: "none"
                                }}
                                value={tempPayersAndShares[i]?.share} onChange={(e) => {
                                    setTempPayersAndShares((prev) => {
                                        const temp = [...prev];
                                        if(e.target.value >=0){
                                            temp[i].share = e.target.value;
                                        }
                                        else{
                                            temp[i].share = 0.0;
                                        }
                                        return temp;
                                    })
                                }
                                } />
                        </div>
                    )
                })}
            </div>
            <div className='flex justify-center gap-3'>
                <button className="hoverbutton dark mt-4 "
                    onClick={() => {
                        setPayersAndShares(tempPayersAndShares);
                        setShowShareModal(false);

                    }}
                >
                    Done
                </button>
                <button className="hoverbutton dark mt-4 " onClick={
                    () => {
                        setPayersAndShares(payersAndShares);
                        setShowShareModal(false);
                    }
                }>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default PayerShares