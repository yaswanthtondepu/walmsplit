import { Navigate, } from "react-router-dom";
const Protected = ({ children }) => {

   let token = localStorage.getItem("access_token");
   console.log(token)
   if(token ){
    return children !== " "? children:<Navigate to="/home" replace />;
   }
   else{
     const routeParams = window.location.href.split("#")[1];
     const token = routeParams?.split("&")[0].split("=");
     if (!token || token[0] !== "access_token" || token[1] === "") {
        console.log("Login Unsuccessful")
       alert("Login Unsuccessful");
       return <Navigate to="/" replace />;
     } 
     else {
       localStorage.setItem("access_token", token[1]);
       return children !== " " ? children : <Navigate to="/home" replace />;
     }
   }
   
};
export default Protected;
