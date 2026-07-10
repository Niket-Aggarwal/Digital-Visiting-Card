import React from 'react'
import { Outlet, useLocation } from "react-router-dom";
import { HiRocketLaunch, HiOutlineShieldCheck } from "react-icons/hi2";
import Navbar from "../Components/Other/Navbar"
import ProfileCard from "../Components/Other/Card"

const Auth = () => {

    const location = useLocation();
    const isLogin = location.pathname === "/login";

    return (
        <>
            <Navbar />
            <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-10">
                <section className="hidden lg:flex lg:w-1/2 justify-center items-center">
                    <ProfileCard
                        name={isLogin ? "Welcome Back" : "Join NexLink"}
                        bio={isLogin ? "Continue your journey" : "Create your digital identity"}
                        about={
                            isLogin
                                ? "Access your professional profile, manage your links and continue building your online identity."
                                : "Create your account and start showcasing your portfolio, social links and professional presence."
                        }
                        img={
                            isLogin
                                ? HiOutlineShieldCheck
                                : HiRocketLaunch
                        }
                    />
                </section>
                <section className="flex w-full items-center justify-center lg:w-1/2">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </section>
            </main>
        </>
    );
};

export default Auth;