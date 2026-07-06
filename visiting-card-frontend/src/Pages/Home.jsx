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

// import { useState } from "react";

// function Home() {

//     const [phno, setPhno] = useState("");
//     const [image, setImage] = useState(null);
//     const [check, setCheck] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();

//         formData.append("phone", phno);
//         if(check){
//             formData.append("check", check);
//         }

//         if (image) {
//             formData.append("image", image);
//         }

//         try {

//             const response = await fetch("http://localhost:3000/profile/second", {
//                 method: "PATCH",
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`
//                 },
//                 body: formData
//             });

//             const data = await response.json();

//             console.log(data);

//             if (response.ok) {
//                 alert("Success");
//             } else {
//                 alert(data.message);
//             }

//         } catch (err) {
//             console.error(err);
//             alert("Something went wrong");
//         }
//     };

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 minHeight: "100vh"
//             }}
//         >
//             <form onSubmit={handleSubmit}>

//                 <h2>Cloudinary Upload Test</h2>

//                 <br />

//                 <input
//                     type="text"
//                     placeholder="Phone Number"
//                     value={phno}
//                     onChange={(e) => setPhno(e.target.value)}
//                 />

//                 <br />
//                 <br />

//                 <input
//                     type="file"
//                     accept=".jpg,.jpeg,.png,.webp"
//                     onChange={(e) => setImage(e.target.files[0])}
//                 />

//                 <br />
//                 <br />

//                 <label>
//                     <input
//                         type="checkbox"
//                         checked={check}
//                         onChange={(e) => setCheck(e.target.checked)}
//                     />
//                     Use Auth Image
//                 </label>

//                 <br />
//                 <br />

//                 <button type="submit">
//                     Submit
//                 </button>

//             </form>
//         </div>
//     );
// }

// export default Home;