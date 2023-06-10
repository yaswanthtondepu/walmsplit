import React, { useState } from 'react'

const Search = ({ setSearchPerson }) => {

    function handleSearchChange(e) {
        setSearchPerson(e.target.value);
    }
    return (
        <>
            <div className='mt-3'>
                <input type="text" placeholder="Search"
                    style={{ border: "1px solid black" }}
                    className="rounded-md w-1/2 h-10 pl-2 focus:outline-none"
                    onChange={handleSearchChange} />
            </div>
        </>
    )
}

export default Search