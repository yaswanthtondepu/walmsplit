import React from 'react'


const Splitwise = () => {
    function connectToSplitwise(){
        window.location.href = "https://secure.splitwise.com/oauth/authorize?response_type=token&client_id=4tGEaqs85zHc7rjbodKXuAG7xuYT4QCpTddEdUtP";
    }
  return (
    <div>
        <button style={{border:"none", backgroundColor:"lightseagreen", color:"white", cursor:"pointer", padding:"0.5rem", borderRadius:"5px"}}
        onClick={connectToSplitwise}>Connect to splitwise</button>
    </div>
  )
}

export default Splitwise