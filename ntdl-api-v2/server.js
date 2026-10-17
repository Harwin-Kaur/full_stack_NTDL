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


//static serving
import path from "path";
const __dirname = path.resolve();

//serve static files from the node

app.use(express.static(path.join(__dirname, "dist"))); //middleware
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server is running at http://localhost:${PORT}`);
});
