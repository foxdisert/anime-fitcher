export default async function handler(req, res) {
    // ✅ CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        // ✅ Respond to preflight request
        res.status(200).end();
        return;
    }

    try {
        const { url } = req.query;
        if (!url) return res.status(400).send("❌ Missing URL");

        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        if (!response.ok) throw new Error(`❌ HTTP Error: ${response.status}`);

        const html = await response.text();
        res.status(200).send(html);
    } catch (error) {
        console.error("🔥 Error:", error.message);
        res.status(500).send("❌ Server Error: " + error.message);
    }
}
