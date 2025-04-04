export default async function handler(req, res) {
    try {
        let url = req.query.url;
        if (!url) return res.status(400).send("❌ Missing URL");

        const response = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        if (!response.ok) throw new Error(`❌ HTTP Error: ${response.status}`);

        const html = await response.text();
        res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all CORS
        res.send(html);
    } catch (error) {
        console.error("🔥 Error:", error.message);
        res.status(500).send("❌ Server Error: " + error.message);
    }
}
