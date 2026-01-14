import express from "express";
import cors from "cors";
import inquiryRoutes from "./routes/inquiries.routes.js";

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/inquiries", inquiryRoutes);

app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

export default app;
