import "reflect-metadata";
require("dotenv").config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createConnection, getConnectionOptions } from "typeorm";
import  config  from "./config";
import  routes  from "./routes";

const app: express.Application = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", routes);

const startServer = async () => {
  try {
    const options = await getConnectionOptions(
      process.env.NODE_ENV || "development"
    );
    await createConnection({ ...options, name: "default" });

    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`);
    });
  } catch (e) {
    console.log("An error appeared", e);
  }
};

startServer();
