export default async function handler(req, res) {
    try {
        const backendURL = process.env.BACKEND_URL;
        if (!backendURL) {
            return res.status(500).json({
                success: false,
                message: "Server configuration issue",
            });
        }
        const path = req.url.replace(/^\/api/, "");
        const headers = {
            "Content-Type": "application/json",
        };
        if (req.headers.authorization) {
            headers.Authorization = req.headers.authorization;
        }
        const options = {
            method: req.method,
            headers,
        };
        if (req.method !== "GET" && req.method !== "HEAD") {
            options.body = JSON.stringify(req.body);
        }
        const response = await fetch(
            `${backendURL}${path}`,
            options
        );
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (err) {
        console.error("Proxy Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server connection issue",
        });
    }
}