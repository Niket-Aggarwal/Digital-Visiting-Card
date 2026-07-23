export const config = {
    api: {
        bodyParser: false,
    },
};

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
        const headers = {};
        if (req.headers.authorization) {
            headers.authorization = req.headers.authorization;
        }
        if (req.headers["content-type"]) {
            headers["content-type"] = req.headers["content-type"];
        }
        const response = await fetch(`${backendURL}${path}`, {
            method: req.method,
            headers,
            body:
                req.method === "GET" || req.method === "HEAD" ? undefined : req, duplex: "half"
        });
        const contentType = response.headers.get("content-type") || "";
        res.status(response.status);
        if (contentType.includes("application/json")) {
            const data = await response.json();
            return res.json(data);
        }
        const text = await response.text();
        return res.send(text);
    } catch (err) {
        console.error("Proxy Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server connection issue",
        });
    }
}