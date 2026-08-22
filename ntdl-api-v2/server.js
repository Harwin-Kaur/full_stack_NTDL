import express from "express";
const app = express();
const PORT = 8000;
import morgan from "morgan";
 import cors from "cors";
 

// Connect MongoDb
import { connectMongoDb } from "./src/config/dbConfig.js";
connectMongoDb();

app.use(morgan("dev"));
app.use(express.json());
//  app.use(cors());

import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
