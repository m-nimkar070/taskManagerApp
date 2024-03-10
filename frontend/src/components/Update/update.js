import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import config from "../../config.json";

const Update = ({isEdited ,setIsEdited}) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const { id } = useParams();

  //Function to get perticular task data
  const data = async () => {
    try {
      const result = await axios.get(`${config.endpoint}/${id}`);
      setValues(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  //Handle Update and navigate to home
  const handleUpdate=async (e)=>{

    e.preventDefault();
    try {
      await axios.patch(`${config.endpoint}/${id}` , {...values})
      setIsEdited(!isEdited);
      navigate('/')
    } catch (error) {
      
    }
  }

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update Task Details</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={values.title}
              className="form-control"
              required
              placeholder="Enter title here"
              onChange={e=>setValues({...values , title:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="title"
              value={values.description}
              className="form-control"
              required
              placeholder="Enter description here"
              onChange={e=>setValues({...values , description:e.target.value})}
            />
          </div>
          <button className="btn btn-success">Update</button>
          <Link to={"/"} className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Update;
