import React, { useState } from "react";

export const Table = ({
  switchTask,
  handleOnDelete,
  handelOnSelect,
  toDelete,
  entryList,
  badList,
}) => {
  return (
    <>
      <div className="row mt-5">
        <div className="col-md">
          <h3 className="text-center">Entry List</h3>
          <hr />
          {/* <!-- Entry list table  --> */}
          <input
            className="form-check-input"
            type="checkbox"
            value="allEntry"
            id="all-entry"
            onChange={handelOnSelect}
          />{" "}
          <label htmlFor="all-entry">Select All</label>
          <table className="table table-striped table-hover border">
            <tbody id="entryList">
              {entryList.map((item, i) => {
                return (
                  <tr key={item?._id}>
                    <td>{i + 1}</td>
                    <td>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={item?._id}
                        onChange={handelOnSelect}
                        checked={toDelete.includes(item?._id)}
                      />{" "}
                      {item.task}
                    </td>
                    <td>{item.hr}hr</td>
                    <td className="text-end">
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
          <input
            className="form-check-input"
            type="checkbox"
            value="allBad"
            id="all-bad"
            onChange={handelOnSelect}
          />{" "}
          <label htmlFor="all-bad">Select All</label>
          <table className="table table-striped table-hover border">
            <tbody id="badList">
              {badList.map((item, i) => (
                <tr key={item?._id}>
                  <td>{i + 1}</td>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={item?._id}
                      id=""
                      onChange={handelOnSelect}
                      checked={toDelete.includes(item?._id)}
                    />{" "}
                    {item.task}
                  </td>
                  <td>{item.hr}hr</td>
                  <td className="text-end">
                    <button
                      onClick={() => switchTask(item._id, "entry")}
                      className="btn btn-warning"
                    >
                      <i className="fa-solid fa-arrow-left"></i>
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
      {toDelete.length > 0 && (
        <div className="row my-5 d-grid">
          <button
            onClick={() => handleOnDelete(toDelete)}
            className="btn btn-danger"
          >
            Delete {toDelete.length} task(s)
          </button>
        </div>
      )}
    </>
  );
};
