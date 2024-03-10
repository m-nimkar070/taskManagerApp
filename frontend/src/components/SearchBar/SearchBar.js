import React from 'react'
import { Link } from 'react-router-dom'

const SearchBar = ({handleDelete , handleSort ,searchResult , sortedTask}) => {
  return (
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
        {searchResult ? (
          <table className=" table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((item, idx) => (
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
  )
}

export default SearchBar
