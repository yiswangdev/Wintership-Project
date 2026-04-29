import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/quote/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const apikey = process.env.apikey;

    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apikey}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch {
    res.status(500).json({ error: "fetch failed" });
  }
});

app.listen(3001, () => console.log("Server running on 3001"));
