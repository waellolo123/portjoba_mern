import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.controller.js";


const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

app.post("/webhooks", clerkWebhooks);

Sentry.setupExpressErrorHandler(app);
app.listen(port, () => {
  connectDB();
  console.log(`server running on port ${port}`);
})

