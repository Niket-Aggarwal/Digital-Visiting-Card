import React from 'react'
import Navbar from "../Components/Other/Navbar"
import Head from "../Components/Home/Head"
import ProfileCard from "../Components/Home/Card";
import WhyNexLink from "../Components/Home/WhyNexlink";
import CTA from "../Components/Home/CTA"
import Getstart from '../Components/Home/Getstart';
import Footer from "../Components/Home/Footer"


const Home = () => {
    return (
        <>
            <Navbar />
            <main>
                <section id='home' className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-12 lg:flex-row">
                    <div className="w-full lg:w-1/2">
                        <Head />
                    </div>
                    <div className="hidden lg:flex lg:w-1/2 justify-center">
                        <ProfileCard />
                    </div>
                </section>
                <section className="mx-auto max-w-7xl px-6 py-24" aria-labelledby="why-nexlink">
                    <WhyNexLink />
                </section>
                <section className="mx-auto max-w-7xl px-10 py-13">
                    <CTA />
                </section>
                <section className="mx-auto max-w-5xl px-6 pb-24">
                    <Getstart />
                </section>
            </main>
            <Footer />
        </>
    );
};


export default Home;