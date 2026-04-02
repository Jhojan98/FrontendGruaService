import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Mock API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/bases", (req, res) => {
    res.json([
      { id: "base-1", name: "Main Depot North" },
      { id: "base-2", name: "Satellite Station South" },
      { id: "base-3", name: "East Side Hub" },
    ]);
  });

  app.get("/api/clients", (req, res) => {
    res.json([
      { id: "c1", name: "Aria Montgomery", membership: "Premium", phone: "(503) 555-0123" },
      { id: "c2", name: "Ezra Fitz", membership: "Standard", phone: "(503) 555-0456" },
      { id: "c3", name: "Hanna Marin", membership: "Gold", phone: "(503) 555-0789" },
    ]);
  });

  app.post("/api/dispatch", (req, res) => {
    console.log("New Dispatch Received:", req.body);
    res.status(201).json({ message: "Dispatch created successfully", id: Math.random().toString(36).substr(2, 9) });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
