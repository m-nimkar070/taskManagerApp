import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const TaskList = ({ isEdited }) => {
  const [task, setTask] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [sortedTask, setSortedTask] = useState("dsc");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(0)

  //function fetch data with query params sortBy
  const data = async (sortBy) => {
    setIsLoading(!isLoading);
    try {
      const result = await axios.get(`${config.endpoint}?sortBy=${sortBy}`);
      setTask(result.data);
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };

  // Function to handle dlete the document from Db
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete this task !");
    if (confirm) {
      axios.delete(`${config.endpoint}/${id}`);
    }
    window.location.reload();
  };

  //Function to sort pass sorting values to data function onClick
  const handleSort = (e) => {
    if (e.target.value === "dsc") {
      data(e.target.value);
      setSortedTask("asc");
    }
    data("asc");
    setSortedTask("dsc");
  };

  //Search result function to filter out data as per user input
  const handleSearchResult = (value) => {
    const result = task.filter((a) => {
      return a.title.toLowerCase().includes(value);
    });
    // console.log(result);
    setSearchResult(result);
  };

  const handleSearch = (value) => {
    setSearch(value);
    // console.log(value);
  };

  // Debouncing to make function more reliable api call perspetive .
  const debounceSearch = (event, debounceTimeout) => {
    const value = event.target.value;
    handleSearch(value)
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      handleSearchResult(value);
    }, 500);
    setDebounceTimeout(timeout);
  };


  useEffect(() => {
    data();
  }, []);
  useEffect(() => {
    data();
  }, [isEdited]);

  // console.log("tasks", task);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>Task Manager App</h1>
      <input
        type="text"
        className="form-control border shadow mb-3 w-50"
        placeholder="Search Task"
        value={search}
        onChange={(e)=> debounceSearch(e,debounceTimeout)}
      />
      {search ? (
        <SearchBar
          searchResult={searchResult}
          handleDelete={handleDelete}
          handleSort={handleSort}
          sortedTask={sortedTask}
        />
      ) : (
        <div className="w-75 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-end">
            <Link to={"/add"} className="btn btn-success m-2">
              Add Task
            </Link>
            <button className="btn btn-primary m-2" onClick={handleSort} value={sortedTask}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-sort-up"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.5.5 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
              </svg>
              Sort
            </button>
          </div>
          {task ? (
            <table className=" table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {task.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <Link
                        to={`/view/${item["_id"]}`}
                        className="btn btn-sm btn-info me-2"
                      >
                        View
                      </Link>
                      <Link
                        to={`/update/${item["_id"]}`}
                        className="btn btn-sm btn-primary me-2 "
                      >
                        Edit
                      </Link>
                      <button
                        onClick={(e) => handleDelete(item["_id"])}
                        className="btn btn-sm btn-danger "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "Nothing to show"
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
