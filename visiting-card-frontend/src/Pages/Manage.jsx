import { useEffect, useState } from "react";
import Progress from "../Components/Manage/Progress";
import Basic from "../Components/Manage/Basic";
import Uploads from "../Components/Manage/Uploads";
import Social from "../Components/Manage/Social";
import Finish from "../Components/Manage/Finish";
import useCard from "../Hooks/useCard";
import { Samepagetop } from "../Utility/Functions";

const Manage = () => {

    const { card, initializecard } = useCard();

    const [step, setStep] = useState(() => {
        const savedStep = Number(
            localStorage.getItem("manageStep")
        );
        if (savedStep >= 1 && savedStep <= 4) {
            return savedStep;
        }
        return 1;
    });

    useEffect(() => {
        localStorage.setItem("manageStep", String(step));
    }, [step]);

    useEffect(() => {
        return () => {
            localStorage.removeItem("manageStep");
        };
    }, []);

    const next = async () => {
        await initializecard();
        setStep((prev) => Math.min(prev + 1, 4));
        Samepagetop();
    };

    const back = async () => {
        await initializecard();
        setStep((prev) => Math.max(prev - 1, 1));
        Samepagetop();
    };

    return (
        <div className="w-full">
            <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Manage Identity
                </h1>
                <p className="mt-2 text-sm text-gray-400 sm:text-base">
                    Create or update your NexLink digital identity step by step.
                </p>
            </div>
            <div className="mt-8 rounded-2xl border border-blue-500/20 bg-slate-900/50 p-5 sm:p-6 lg:p-8">
                <Progress step={step} />
                <div className="hidden md:block">
                    <div className="my-8 border-t border-blue-500/10" />
                </div>
                {step === 1 && (<Basic next={next} card={card} />)}
                {step === 2 && (<Uploads next={next} back={back} card={card} />)}
                {step === 3 && (<Social next={next} back={back} card={card} />)}
                {step === 4 && (<Finish back={back} card={card} />)}
            </div>
        </div>
    );
};

export default Manage;