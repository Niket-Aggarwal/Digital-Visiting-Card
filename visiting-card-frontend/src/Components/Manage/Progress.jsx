
const Progress = ({ step }) => {

    const steps = ["Basic Details", "Image & Contact", "Social Accounts", "Layout"];

    return (
        <div className="hidden w-full items-center md:flex">
            {steps.map((name, index) => {
                const stepNumber = index + 1;
                const current = step === stepNumber;
                const completed = step > stepNumber;

                return (
                    <div key={name} className="flex flex-1 items-center last:flex-none">
                        <div className="flex flex-col items-center">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border font-semibold transition duration-300 ${current
                                ? "border-cyan-300 bg-cyan-500/20 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.55)]"
                                : completed
                                    ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                                    : "border-blue-500/20 bg-slate-900 text-gray-500"
                                }`}
                            >
                                {stepNumber}
                            </div>
                            <p className={`mt-2 whitespace-nowrap text-sm ${current ? "font-medium text-cyan-300" : completed ? "text-cyan-500" : "text-gray-500"}`}>
                                {name}
                            </p>
                        </div>
                        {stepNumber !== steps.length && (
                            <div className={`mx-4 h-px flex-1 transition duration-300 ${completed ? "bg-cyan-400" : "bg-blue-500/20"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Progress;