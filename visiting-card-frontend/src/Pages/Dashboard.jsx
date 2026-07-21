import useAuth from "../Hooks/useAuth";

import ProfileSection from "../Components/Dashboard/ProfileSection";
import IdentitySection from "../Components/Dashboard/IdentitySection";
import PremiumSection from "../Components/Dashboard/PremiumSection";
import DangerSection from "../Components/Dashboard/DangerSection";

const Dashboard = () => {

    const { user } = useAuth();

    return (
        <div className="w-full">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Identity Center
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-400">
                    Manage your digital identity, customize your profile, and control how the world connects with you through NexLink.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
                <ProfileSection />
                <IdentitySection />
                <PremiumSection />
                <DangerSection />
            </div>
        </div>
    );
};

export default Dashboard;