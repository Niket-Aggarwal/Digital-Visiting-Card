export const CallAPI = async (path,method,data = {},token = null) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        const options = {
            method,
            headers,
        };
        if (method !== "GET") {
            options.body = JSON.stringify(data);
        }
        const res = await fetch(`/api${path}`, options);
        const result = await res.json();
        return result;
    } catch (err) {
        console.error("API Calling Error:", err);
        return {
            success: false,
            message: "Issue in connecting to Server",
        };
    }
};