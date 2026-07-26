import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Meta CAPI Proxy Route
app.post("/api/meta-event", async (req, res) => {
  const { event_name, event_id, event_source_url, user_data, custom_data } = req.body;
  
  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
  const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn("Meta CAPI missing PIXEL_ID or ACCESS_TOKEN");
    return res.status(500).json({ status: "error", message: "CAPI not configured" });
  }

  try {
    const payload = {
      data: [{
        event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id,
        event_source_url,
        action_source: "website",
        user_data: {
          client_ip_address: req.ip,
          client_user_agent: req.headers["user-agent"],
          ...user_data
        },
        custom_data
      }]
    };

    if (TEST_EVENT_CODE) {
      // @ts-ignore
      payload.test_event_code = TEST_EVENT_CODE;
    }

    const response = await fetch(`https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error("Meta CAPI Error:", error);
    res.status(500).json({ status: "error" });
  }
});

const startServer = async () => {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
