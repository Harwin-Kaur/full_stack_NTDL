import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { Table } from "./components/Table";
import { postTask, fetchAllTasks, updateTasks, deleteTask } from "./helpers/axiosHelper.js";

const hrPerWek = 24 * 7;
function App() {
  const [taskList, setTaskList] = useState([]);

 const [resp, setResp] = useState({})
 const shouldFetchRef = useRef(true);

  const ttlHr = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);                          


  useEffect(() => {
    shouldFetchRef.current && getAllTask();
    shouldFetchRef.current = false;
  },[]);

  const addTaskList = async (taskObj) => {
    // const obj = {
    //   ...taskObj,
    //   id: randomIdGenerator(),
    //   type: "entry",
    // };

    // if (ttlHr + taskObj.hr > hrPerWek) {
    //   return alert("Sorry Boss not enought time fit this task from last week.");
    // }

    // setTaskList([...taskList, obj]);

    //call api to send data to the database
    const response = await postTask(taskObj);
  console.log(response);
  setResp(response);
  
  };

  const switchTask = async (_id, type) => {
    // setTaskList(
    //   taskList.map((item) => {
    //     if (item.id === id) {
    //       item.type = type;
    //     }

    //     return item;
    //   })
    // );

    const response = await updateTasks({_id, type});
    setResp(response);
   
  };

  const randomIdGenerator = (lenght = 6) => {
    const str =
      "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM1234567890";

    let id = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      id += str[randomIndex];
    }

    return id;
  };

  const handleOnDelete = async (idsToDelete) => {
    if (window.confirm("Are you sure, you want to delete this?")) {
      // setTaskList(taskList.filter((item) => item._id !== id));

      //to do delete
      const  response = await deleteTask(idsToDelete);
      setResp(response);

       if(response.status ==="success"){
      //fetchalltask from the server 
      getAllTask();

      //when operation is successful, empty the delete array

      idsToDelete([]);

    }
      
    }
  };

  const getAllTask = async () => {
    // call the axios helper to get data from the server

    const data = await fetchAllTasks();
    // console.log(data);
    // mount that data to our taskList state
    data?.status === "success" && setTaskList(data.tasks);
  };

   const handleOnSelect = (e) => {
   
    const {checked, value} = e.target;

    let tempArg = [];
    if(value === "allEntry"){
      tempArg = entryList;
    }
    if(value === "allBad"){
      tempArg = badList;
    }

    if(checked){

      if(value === "allEntry" || value === "allBad"){
        // get all ids from entry list

        const _ids = tempArg.map(item => item._id);
        const uniqueIds = [...new Set([ ...toDelete,
          ..._ids])];

        setToDelete(uniqueIds);


        // setToDelete([
        //   ...toDelete,
        //   ..._ids
        // ]);
       
        return;
      }

      setToDelete([
        ...toDelete, value
      ]);
    } else{

      if(value === "allEntry" || value === "allBad"){
        const _ids = tempArg.map(item => item._id);
        
        setToDelete(toDelete.filter(_id => !_ids.includes(_id)));
        return;
      }
      setToDelete(toDelete.filter((_id) => _id !== value));
    }
     console.log(checked, value);
  };

     console.log(toDelete);

  return (
    <div className="wrapper pt-5">
      {/* <!-- title  --> */}
      <div className="container">
        <h1 className="text-center">Not To Do List</h1>
        
        
        {resp?.message && (<div className={resp?.status === "success" ?  "alert alert-success": "alert alert-danger"}>{resp?.message}</div>)}

        {/* <!-- form  --> */}
        <Form addTaskList={addTaskList} />

        {/* <!-- tables --> */}
        <Table
          taskList={taskList}
          switchTask={switchTask}
          handleOnDelete={handleOnDelete}
        />

        <div className="alert alert-success">
          The total hours allocated = <span id="ttlHrs">{ttlHr}</span> hrs
        </div>
      </div>
    </div>
  );
}

export default App;
