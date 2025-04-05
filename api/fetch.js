export default async function handler(req, res) {
    // ✅ CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        // ✅ CORS preflight support
        return res.status(200).end();
    }

    const url = req.query.url;

    if (!url) {
        return res.status(400).send("❌ Missing URL");
    }

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const html = await response.text();
        res.status(200).send(html);
    } catch (error) {
        console.error("🔥 Server error:", error.message);
        res.status(500).send("❌ Failed to fetch content");
    }
}
