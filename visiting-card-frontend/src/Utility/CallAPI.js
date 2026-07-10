const url = import.meta.env.VITE_API_URL_LOCAL;

export const CallAPI = async (path, method, data = {}, token = null) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        let res;
        if (method === "GET") {
            res = await fetch(`${url}${path}`, {
                method,
                headers,
            });
        } else {
            res = await fetch(`${url}${path}`, {
                method,
                headers,
                body: JSON.stringify(data),
            });
        }
        if (!res.ok) {
            throw new Error("Request failed");
        }
        return await res.json();
    } catch (err) {
        console.error("API Calling Error:", err);
        return {
            success: false,
            message: "Issue in connecting to backend",
        };
    }
};