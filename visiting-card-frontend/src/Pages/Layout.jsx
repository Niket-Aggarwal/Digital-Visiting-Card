import React, { useState } from "react";
import { HiOutlineComputerDesktop, HiOutlineDeviceTablet, HiOutlineDevicePhoneMobile, HiOutlineXMark, } from "react-icons/hi2";
import Minimal from "../Components/Layout/Minimal";
import Modern from "../Components/Layout/Modern";
import Bold from "../Components/Layout/Bold";
import useCard from "../Hooks/useCard";

const Layout = () => {

    const { card } = useCard();
    const [previewLayout, setPreviewLayout] = useState(null);
    const [device, setDevice] = useState("desktop");

    const isMobile = window.innerWidth < 640;

    const demoCard = {
        name: "your name",
        headline: "a single word that defines you or your profession",
        bio: "Anything about you that you feels to share with others",
        email: "xyz@example.com",
        phno: "+91 92xxxxxxxxxx",
        image: "",
        instagram: "instagram.com",
        github: "github.com",
        linkedin: "linkedin.com",
        telegram: "telegram.org",
        others: [{ platform: "Portfolio", link: "portfolio.com", },],
    };

    const makePreview = (layout, theme) => ({ ...demoCard, layout, theme, });

    const layouts = [
        {
            id: "minimal-dark",
            title: "Minimal Dark",
            subtitle: "Elegant minimal design with dark theme",
            Component: Minimal,
            data: makePreview("minimal", "dark"),
        },
        {
            id: "minimal-light",
            title: "Minimal Light",
            subtitle: "Clean minimal design with light theme",
            Component: Minimal,
            data: makePreview("minimal", "light"),
        },
        {
            id: "modern-dark",
            title: "Modern Dark",
            subtitle: "Sleek modern layout with dark accents",
            Component: Modern,
            data: makePreview("modern", "dark"),
        },
        {
            id: "modern-light",
            title: "Modern Light",
            subtitle: "Fresh modern layout with light finish",
            Component: Modern,
            data: makePreview("modern", "light"),
        },
        {
            id: "bold-dark",
            title: "Bold Dark",
            subtitle: "Striking bold design with dark theme",
            Component: Bold,
            data: makePreview("bold", "dark"),
        },
        {
            id: "bold-light",
            title: "Bold Light",
            subtitle: "Vivid bold design with light theme",
            Component: Bold,
            data: makePreview("bold", "light"),
        },
    ];

    const PreviewComponent = previewLayout?.Component;

    return (
        <div className="w-full">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Layout Options
                </h1>

                <p className="mt-2 text-sm sm:text-base text-gray-400">
                    Preview every available NexLink layout before choosing your favourite design.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-5">
                {layouts.map((opt) => {
                    const PreviewComp = opt.Component;
                    return (
                        <div key={opt.id} onClick={() => { setPreviewLayout(opt); setDevice(isMobile ? "mobile" : "desktop"); }}
                            className="group cursor-pointer overflow-hidden rounded-2xl border border-blue-500/20 bg-[#111827]/70 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,.15)]"
                        >
                            <div className="flex items-start justify-between p-5">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">
                                        {opt.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-400">
                                        {opt.subtitle}
                                    </p>
                                </div>
                                <span className="rounded-full border border-cyan-400 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300">
                                    Preview
                                </span>
                            </div>
                            <div className="px-5 pb-5">
                                <div className="relative h-72.5 overflow-hidden rounded-2xl border border-blue-500/10 bg-[#050b18]">
                                    <div className="absolute left-0 top-0 origin-top-left pointer-events-none" style={{ transform: "scale(.28)", width: "357%", height: "357%", }}>
                                        <PreviewComp card={opt.data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {previewLayout && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
                    <div className="relative w-full h-full rounded-3xl border border-slate-700 bg-[#08111f] shadow-[0_0_60px_rgba(34,211,238,.15)] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {previewLayout.title}
                                </h2>
                                <p className="text-slate-400 text-sm">
                                    Live Layout Preview
                                </p>
                            </div>
                            <button onClick={() => setPreviewLayout(null)} className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700">
                                <HiOutlineXMark className="text-xl" />
                            </button>
                        </div>
                        {!isMobile && (
                            <div className="flex justify-center gap-4 py-5 border-b border-slate-800">
                                <button onClick={() => setDevice("desktop")}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all ${device === "desktop" ? "bg-cyan-500 text-white" : "bg-slate-800 text-slate-300"}`}
                                >
                                    <HiOutlineComputerDesktop className="text-xl" />
                                    <span>Desktop</span>
                                </button>
                                <button onClick={() => setDevice("tablet")}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all ${device === "desktop" ? "bg-cyan-500 text-white" : "bg-slate-800 text-slate-300"}`}
                                >
                                    <HiOutlineDeviceTablet className="text-xl" />
                                    Tablet
                                </button>
                                <button onClick={() => setDevice("mobile")}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all ${device === "desktop" ? "bg-cyan-500 text-white" : "bg-slate-800 text-slate-300"}`}
                                >
                                    <HiOutlineDevicePhoneMobile className="text-xl" />
                                    Mobile
                                </button>
                            </div>
                        )}
                        <div className="flex-1 overflow-auto flex justify-center items-start py-8 px-4">
                            <div className={`transition-all duration-500 ${isMobile ? "w-full" : device === "desktop" ? "w-300" : device === "tablet" ? "w-3xl" : "w-97.5"}`}>
                                {PreviewComponent && (<PreviewComponent card={previewLayout.data} />)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default Layout;