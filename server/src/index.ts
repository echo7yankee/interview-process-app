import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./database/connectDB";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
app.use(bodyParser.json());
app.use(cors());

// Routing base
import { movieRouter } from "./routes/movie";

// Auth route
app.use("/movie", movieRouter);

const PORT = process.env.PORT || 6001;
connectDB(app, PORT);
