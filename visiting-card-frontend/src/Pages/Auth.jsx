import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Other/Navbar"
import Footer from "../Components/Home/Footer"

const Auth = () => {

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                <section>
                    {/* Left side */}
                </section>

                <section>
                    <Outlet />
                </section>
            </main>
            {/* <Footer /> */}
        </>
    );
};

export default Auth;