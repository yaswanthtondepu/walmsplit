import React from 'react'

const NewSitePopup = ({ setShowNewSitePopup }) => {
    return (
        <div className=' absolute bg-white z-[999] rounded-lg w-[300px] shadow-lg top-60 my-0 mx-auto left-0 right-0  '>
            <div className='p-4'>
                <p>We have developed a new website.</p>
                <p>Please vist our <a href='https://walmartsplit.vercel.app'>new website</a> for more features, new UI, better experience and more.</p>
                <p>PS :) This website will work for now if you prefer to use this.</p>
            </div>
            <div className='p-2 text-center'>
                <button
                    onClick={() => {
                        setShowNewSitePopup(false);
                    }}
                    className='bg-black text-white p-2 rounded-md'
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default NewSitePopup