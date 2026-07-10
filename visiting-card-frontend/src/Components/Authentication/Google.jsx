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
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={async (response) => {
          try {
            const result = await GoogleCall({ credential: response.credential });
            if (!result.success) {
              setError(result.message);
              return;
            }
            await initialize();
            await initializecard();
            navigate("/dashboard");
          } catch (err) {
            console.error("ContextAPI Error:", err)
            setError("Google Client Error");
          }
        }}
        onError={() => {
          setError("Google Sign In Failed");
        }}
      />
      {error && (
        <p className="mt-4 text-center text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Google;