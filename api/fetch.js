import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/fetch", async (req, res) => {
    try {
        let url = req.query.url;
        if (!url) return res.status(400).send("❌ Missing URL");

        let response = await fetch(url, {
            headers: { "User-Agent": "Mozilla/5.0" },
        });

        if (!response.ok) throw new Error(`❌ HTTP Error: ${response.status}`);

        let data = await response.text();
        res.send(data);
    } catch (error) {
        console.error("🔥 Error:", error.message);
        res.status(500).send("❌ Server Error: " + error.message);
    }
});

app.listen(3000, () => console.log("🚀 Proxy running on port 3000"));
