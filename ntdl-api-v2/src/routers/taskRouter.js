import express from "express";
const router = express.Router();
import {
  deleteTask,
  getTasks,
  insertTask,
  updateTask,
} from "../models/taskModel/TaskSchema.js";

// router.all("/", (req, res, next) => {
//   // do your code
//   //   res.json({
//   //     status: "success",
//   //     message: "response form all",
//   //   });

//   next();
// });

router.post("/", async (req, res, next) => {
  try {
    //inser task
    // const result = await insertTask(req.body);
    console.log(req.body);
    res.json({
      status: "success",
      message: "New task has been added successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/", async (req, res, next) => {
  // do your code
  // db.c.find()
  const tasks = await getTasks();

  res.json({
    status: "success",
    message: "Here are the task list",
    tasks,
  });
});

router.patch("/", async (req, res, next) => {
  // do your code
  const { _id, ...rest } = req.body;
  console.log(req.body);
  const result = await updateTask(_id, rest);

  res.json({
    status: "success",
    message: "Your task has been updated",
    result,
  });
});

router.delete("/:_id", async (req, res, next) => {
  // do your code

  const { _id } = req.params;

  const result = await deleteTask(_id);
  res.json({
    status: "success",
    message: "Your task has been deleted",
    result,
  });
});

export default router;
