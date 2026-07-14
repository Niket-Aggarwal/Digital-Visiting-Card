const Finish = ({ back, card }) => {

    return (
        <div className="w-full">

            <div>

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Identity Layout
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Complete the final appearance of your NexLink digital identity.
                </p>

            </div>

            <div className="mt-7 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5">

                <p className="font-medium text-white">
                    Final Creation Step
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Configure your identity layout and finish the NexLink creation process.
                </p>

                {card?.slug && (
                    <p className="mt-4 wrap-break-word text-sm text-cyan-400">
                        mynexlink.vercel.app/{card.slug}
                    </p>
                )}

            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">

                <button
                    type="button"
                    onClick={back}
                    className="cursor-pointer rounded-xl border border-blue-500/20 bg-slate-950/50 px-8 py-3 font-medium text-gray-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                >
                    Back
                </button>

                <button
                    type="button"
                    className="cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02]"
                >
                    Finish Identity
                </button>

            </div>

        </div>
    );
};

export default Finish;