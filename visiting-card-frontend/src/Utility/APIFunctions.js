import { CallAPI } from './CallAPI';

export const GoogleCall = async (data) => {
    try {
        const result = await CallAPI("/auth/google", "POST", data)
        if (result.success) {
            localStorage.setItem("token", result.token)
        }
        return result
    } catch (err) {
        console.error("Google Error:", err);
        return {
            success: false,
            message: "Issue in Calling Google Auth",
        };
    }
}

export const Session = async () => {
    try {
        const result = await CallAPI("/auth/me", "GET", {}, localStorage.getItem("token"))
        if (!result.success) {
            localStorage.removeItem("token")
        }
        return result
    } catch (err) {
        console.error("Session Error:", err);
        return {
            success: false,
            message: "Issue in Keeping Session Active",
        };
    }
}

export const loginuser = async (data) => {
    try {
        const result = await CallAPI("/auth/verify", "POST", data)
        if (result.success) {
            localStorage.setItem("token", result.token)
        }
        return result
    } catch (err) {
        console.error("LoginError:", err);
        return {
            success: false,
            message: "Login Issue",
        };
    }
}

export const signupuser = async (data) => {
    try {
        const result = await CallAPI("/auth/verify", "POST", data);
        return result;
    } catch (err) {
        console.error("Signup Error:", err);
        return {
            success: false,
            message: "Signup Issue",
        };
    }
};

export const registeruser = async (data) => {
    try {
        const result = await CallAPI("/auth/register", "POST", data);
        if (result.success) {
            localStorage.setItem("token", result.token);
        }
        return result;
    } catch (err) {
        console.error("Register Error:", err);
        return {
            success: false,
            message: "OTP Verification Issue",
        };
    }
};

export const forgetPassword = async (data) => {
    try {
        const result = await CallAPI("/auth/forget", "POST", data);
        return result
    } catch (err) {
        console.error("Forget Password Error:", err);
        return {
            success: false,
            message: "Forget Password Issue"
        };
    }
};


export const verifyResetOtp = async (data) => {
    try {
        const result = await CallAPI("/auth/otpverify", "POST", data);
        return result
    } catch (err) {
        console.error("OTP Verify Error:", err);
        return {
            success: false,
            message: "OTP Verification Issue"
        };
    }
};

export const resetPassword = async (data) => {
    try {
        const result = await CallAPI("/auth/passupdate", "PATCH", data);
        return result
    } catch (err) {
        console.error("Password Reset Error:", err);
        return {
            success: false,
            message: "Password Reset Issue"
        };
    }
};

export const deleteAccount = async () => {
    try {
        const token = localStorage.getItem("token");
        const result = await CallAPI("/auth/delete","DELETE",{},token);
        return result;
    } catch (err) {
        console.error("Delete Account Error:", err);
        return {
            success: false,
            message: "Account Delete Issue"
        };
    }
};

export const Dashboard = async () => {
    try {
        const result = await CallAPI("/profile/main", "GET", {}, localStorage.getItem("token"))
        return result
    } catch (err) {
        console.error("DashboardError:", err);
        return {
            success: false,
            message: "Issue in Getting Dashboard Data",
        };
    }
}