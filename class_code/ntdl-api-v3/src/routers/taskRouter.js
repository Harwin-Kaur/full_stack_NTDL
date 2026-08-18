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
    const result = await insertTask(req.body);

    console.log(result);

    result?._id
      ? res.json({
          status: "success",
          message: "New task has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add the task, try again later",
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
  const tasks = await getTasks();

  res.json({
    status: "success",
    message: "Here are the task list",
    tasks,
  });
});

router.patch("/", async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;

    const result = await updateTask(_id, rest);

    result?._id
      ? res.json({
          status: "success",
          message: "Your task has been updated",
        })
      : res.json({
          status: "error",
          message: "Unable to update the task, try again later",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/", async (req, res, next) => {
  try {
    // do your code
    console.log(req.body);

    const result = await deleteTask(req.body);
    console.log(result);

    result?.deletedCount
      ? res.json({
          status: "success",
          message: "Your task has been deleted",
        })
      : res.json({
          status: "error",
          message: "Unable to delete task, try again later",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
