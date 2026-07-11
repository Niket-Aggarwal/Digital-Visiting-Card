import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useCard from "../../Hooks/useCard";
import { GoogleCall } from "../../Utility/APIFunctions";

const Google = () => {

  const navigate = useNavigate();
  const { initialize } = useAuth();
  const { initializecard } = useCard();
  const [error, setError] = useState(null);

  return (
    <div className="w-full">
      <div className="flex justify-center rounded-xl border border-blue-500/20 bg-white/3 p-3 shadow-[0_0_30px_rgba(37,99,235,0.08)] transition duration-300 hover:border-cyan-500/40 hover:bg-white/5">
        <GoogleLogin theme="filled_black" size="large" shape="pill" text="continue_with" width="320"
          onSuccess={async (response) => {
            try {
              setError(null);
              const result = await GoogleCall({
                credential: response.credential,
              });
              if (!result.success) {
                setError(result.message);
                return;
              }
              await initialize();
              await initializecard();
              navigate("/dashboard");
            } catch (err) {
              console.error("ContextAPI Error:", err);
              setError("Google Client Error");
            }
          }}
          onError={() => {
            setError("Google Sign In Failed");
          }}
        />
      </div>
      {error && (
        <p className="mt-4 text-center text-sm text-red-400">
          {error}
        </p>
      )}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-linear-to-r from-transparent to-blue-500/40" />
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
          Or
        </span>
        <div className="h-px flex-1 bg-linear-to-l from-transparent to-cyan-500/40" />
      </div>
    </div>
  );
};

export default Google;