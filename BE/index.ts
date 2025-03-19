import express, { Application, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import rootRouter from "./src/routers";
import dotenv from "dotenv";
import cors from "cors";
import { supabase } from "./src/config/supabase";
// import errorMiddleware from './middlewares/errorMiddleware';

const app: Application = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3002;
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "csrf", "Accept"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(express.json());

app.use("/api", rootRouter);
// app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
