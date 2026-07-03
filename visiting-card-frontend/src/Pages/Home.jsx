import React from 'react'
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"

const Home = () => {
    return (
        <>
            <Navbar />
            <h1 className='bg-blue-400'>Start</h1>
            <Footer />
        </>
    )
}
export default Home

// import React from "react";
// import { GoogleLogin } from "@react-oauth/google";

// const Home = () => {

//     const handleSuccess = async (credentialResponse) => {
//         try {

//             const response = await fetch("http://localhost:3000/auth/google", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     credential: credentialResponse.credential
//                 })
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message);
//             }

//             console.log("Login Successful");
//             console.log(data);

//             localStorage.setItem("token", data.token);
//             localStorage.setItem("user", JSON.stringify(data.user));

//         } catch (error) {
//             console.error(error.message);
//         }
//     };

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100vh"
//             }}
//         >
//             <GoogleLogin
//                 onSuccess={handleSuccess}
//                 onError={() => console.log("Google Login Failed")}
//             />
//         </div>
//     );
// };

// export default Home;