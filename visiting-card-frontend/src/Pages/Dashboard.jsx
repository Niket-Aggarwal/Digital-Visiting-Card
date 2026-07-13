import useAuth from "../Hooks/useAuth";
import useCard from "../Hooks/useCard";

const Dashboard = () => {

    const { user, logout } = useAuth();
    const { card } = useCard();

    return (
        <div>

            <h1 className="text-3xl font-bold text-white">
                Dashboard
            </h1>

            <p className="mt-2 text-gray-400">
                Welcome back, {user?.name}
            </p>
            <button onClick={logout} className="bg-amber-500">Hel</button>

        </div>
    );
};

export default Dashboard;