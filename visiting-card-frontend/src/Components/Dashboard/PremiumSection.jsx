import { FiZap } from "react-icons/fi";

const PremiumSection = () => {

    return (
        <section className="relative min-w-0 overflow-hidden rounded-2xl border border-purple-500/20 bg-slate-900/50 p-5 sm:p-6">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="relative">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-500/10 p-3 text-xl text-purple-400">
                        <FiZap />
                    </div>
                    <div>
                        <p className="text-sm text-purple-400">
                            NexLink Premium
                        </p>
                        <h2 className="text-lg font-semibold text-white sm:text-xl">
                            Premium Identity
                        </h2>
                    </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-gray-400">
                    Premium customization and advanced NexLink identity features
                    are currently under development.
                </p>
                <div className="mt-5 rounded-xl border cursor-pointer border-purple-500/20 bg-purple-500/10 px-4 py-3 text-center text-sm font-medium text-purple-300">
                    Premium is not available yet
                </div>
            </div>
        </section>
    );
};

export default PremiumSection;