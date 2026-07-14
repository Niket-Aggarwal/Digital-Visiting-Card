const Social = ({ next, back, card }) => {

    return (
        <div className="w-full">

            <div>

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                    Social Accounts
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Connect the social platforms you want to share through your digital identity.
                </p>

            </div>

            <div className="mt-7 rounded-xl border border-blue-500/20 bg-slate-950/40 p-5">

                <p className="text-sm text-gray-400">
                    Social account creation will be implemented here.
                </p>

                {card?.slug && (
                    <p className="mt-3 wrap-break-word text-sm text-cyan-400">
                        Identity: /{card.slug}
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
                    onClick={next}
                    className="cursor-pointer rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02]"
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default Social;