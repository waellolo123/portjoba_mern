import "./config/instrument.js";
// import * as Sentry from "@sentry/node";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkWebhooks } from "./controllers/webhooks.controller.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import userRoute from "./routes/user.route.js";
import connectCloudinary from "./config/cloudinary.js";


const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

await connectCloudinary();

app.post("/webhooks", clerkWebhooks);
app.use("/api/users", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/jobs", jobRoute);

// Sentry.setupExpressErrorHandler(app);

await connectDB();
app.listen(port, () => {
  console.log(`server running on port ${port}`);
})

