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