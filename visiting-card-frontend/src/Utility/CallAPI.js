export const CallAPI = async (path, method, data = {}, token = null) => {
    try {
        const isFormData = data instanceof FormData;
        const headers = {};
        if (!isFormData) {
            headers["Content-Type"] = "application/json";
        }
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        const options = { method, headers };
        if (method !== "GET") {
            options.body = isFormData ? data : JSON.stringify(data);
        }
        const res = await fetch(`/api${path}`, options);
        const result = await res.json();
        return result;
    } catch (err) {
        console.error("API Calling Error:", err);
        return {
            success: false,
            message: "Issue in connecting to Server"
        };
    }
};