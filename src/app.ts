import express, { Express } from "express";
import cors from "cors";
import { connectDb, disconnectDB } from "./config";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors()).use(express.json());

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
