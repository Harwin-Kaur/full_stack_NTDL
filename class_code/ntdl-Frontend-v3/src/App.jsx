import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import {
  deleteTasks,
  fetchAllTasks,
  postTask,
  updateTasks,
} from "./helpers/axiosHelper";

const hrPerWek = 24 * 7;
function App() {
  const [taskList, setTaskList] = useState([]);

  const [resp, setResp] = useState({});
  const shouldFetchRef = useRef(true);

  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);

  const [toDelete, setToDelete] = useState([]);
  const entryList = taskList.filter((item) => item.type === "entry") || [];
  const badList = taskList.filter((item) => item.type === "bad") || [];

  useEffect(() => {
    shouldFetchRef.current && getAllTasks();
    shouldFetchRef.current = false;
  }, []);

  const addTaskList = async (taskObj) => {
    if (ttlHr + taskObj.hr > hrPerWek) {
      return alert("Sorry Boss not enought time fit this task from last week.");
    }

    //call api to send data to the database

    const response = await postTask(taskObj);
    setResp(response);
    if (response.status === "success") {
      //re fetch all the tasks
      getAllTasks();
    }
  };

  const switchTask = async (_id, type) => {
    const response = await updateTasks({ _id, type });
    setResp(response);
    if (response.status === "success") {
      //re fetch all the tasks
      getAllTasks();
    }
  };

  const handleOnDelete = async (idsToDelete) => {
    if (window.confirm("Are you sure, you want to delete this?")) {
      //to do delete
      const response = await deleteTasks(idsToDelete);

      setResp(response);

      if (response.status === "success") {
        //re fetch all the tasks
        getAllTasks();

        // empty the toDelete[]
        setToDelete([]);
      }
    }
  };

  const getAllTasks = async () => {
    // call the axiosHelp to get data from the server
    const data = await fetchAllTasks();

    // mount that data to our taskList state
    data?.status === "success" && setTaskList(data.tasks);
  };

  const handelOnSelect = (e) => {
    const { checked, value } = e.target;

    let tempArg = [];
    if (value === "allEntry") {
      tempArg = entryList;
    }
    if (value === "allBad") {
      tempArg = badList;
    }

    if (checked) {
      if (value === "allEntry" || value === "allBad") {
        //get all _ids form entry list

        const _ids = tempArg.map((item) => item._id);
        const uniqueIds = [...new Set([...toDelete, ..._ids])];
        setToDelete(uniqueIds);
        return;
      }

      setToDelete([...toDelete, value]);
    } else {
      if (value === "allEntry" || value === "allBad") {
        const _ids = tempArg.map((item) => item._id);

        setToDelete(toDelete.filter((_id) => !_ids.includes(_id)));
        return;
      }

      setToDelete(toDelete.filter((_id) => _id !== value));
    }
    console.log(checked, value);
  };

  return (
    <div className="wrapper pt-5">
      {/* <!-- title  --> */}
      <div className="container">
        <h1 className="text-center">Not To Do List!</h1>

        {resp?.message && (
          <div
            className={
              resp?.status === "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {resp?.message}
          </div>
        )}

        {/* <!-- form  --> */}
        <Form addTaskList={addTaskList} />

        {/* <!-- tables --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleOnDelete={handleOnDelete}
          toDelete={toDelete}
          handelOnSelect={handelOnSelect}
          entryList={entryList}
          badList={badList}
        />

        <div className="alert alert-success">
          The total hours allocated = <span id="ttlHrs">{ttlHr}</span> hrs
        </div>
      </div>
    </div>
  );
}

export default App;
