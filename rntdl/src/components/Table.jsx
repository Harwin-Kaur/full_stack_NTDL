import React, { useState } from "react";

export const Table = ({ taskList, switchTask, handleOnDelete }) => {

   const [toDelete, setToDelete] = useState([]);
  const entryList = taskList.filter((item) => item.type === "entry") || [];
  const badList = taskList.filter((item) => item.type === "bad") || [];

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
        setToDelete([
          ...toDelete,
          ..._ids
        ]);
        return;
      }

      setToDelete([
        ...toDelete, value
      ]);
    } else{

      if(value === "allEntry" || value === "allBad"){
        const _ids = entryList.map(item => item._id);
        
        setToDelete(toDelete.filter(_id => !_ids.includes(_id)));
        return;
      }
      setToDelete(toDelete.filter((_id) => _id !== value));
    }
     console.log(checked, value);
  };

     console.log(toDelete);

  return (
    <div className="row mt-5">
      <div className="col-md">
        <h3 className="text-center">Entry List</h3>
        <hr />
        {/* <!-- Entry list table  --> */}
        <input className="form-check-input" type="checkbox" value="allEntry" id="all-entry" onChange={handleOnSelect}/>{" "}
        <label htmlFor="all-entry">Select All</label>
        <table className="table table-striped table-hover border">
          <tbody id="entryList">
            {entryList.map((item, i) => {
              return (
                <tr key={item?._id}>
                  <td>{i + 1}</td>
                  <td>
                    <input className="form-check-input" type="checkbox" value={item?._id} onChange={handleOnSelect} checked={toDelete.includes(item._id)}/>{" "}
                    {item.task}</td>
                  <td>{item.hr}hr</td>
                  <td className="text-end">
                    <button
                      onClick={() => handleOnDelete(item._id)}
                      className="btn btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button
                      onClick={() => switchTask(item._id, "bad")}
                      className="btn btn-success"
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-md">
        <h3 className="text-center">Bad List</h3>
        <hr />

        {/* <!-- Bad List table --> */}
        <input className="form-check-input" type="checkbox" value="allBad" id="all-bad" onChange={handleOnSelect}/>{" "}
        <label htmlFor="all-bad">Select All</label>
        <table className="table table-striped table-hover border">
          <tbody id="badList">
            {badList.map((item, i) => (
              <tr key={item?._id}>
                <td>{i + 1}</td>
                <td>
                  
                  <input className="form-check-input" type="checkbox" value={item?._id} id="" onChange={handleOnSelect} checked = {toDelete.includes(item._id)}/>{" "}
                  {item.task}</td>
                <td>{item.hr}hr</td>
                <td className="text-end">
                  <button
                    onClick={() => switchTask(item._id, "entry")}
                    className="btn btn-warning"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button
                    onClick={() => handleOnDelete(item._id)}
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="alert alert-success">
          You could have saved ={" "}
          <span id="savedHrsElm">
            {badList.reduce((acc, i) => acc + i.hr, 0)}
          </span>{" "}
          hr
        </div>
      </div>
    </div>
  );
};
