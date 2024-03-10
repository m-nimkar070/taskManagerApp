import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from '../../config.json'


const Add = ({isEdited,setIsEdited}) => {

    const [values , setValues] = useState({
        title:'',
        description:''
    })

    //Function to add data in DB.
    const data = async () => {
        try {
            const result = await axios.post(`${config.endpoint}`, {...values});
            setIsEdited(!isEdited);
            return result;
        } catch (error) {
            console.log(error.message);
        }
    };

    const navigate = useNavigate();

    const handleSubmit =(e)=>{
        e.preventDefault();
        data();
        navigate('/')
    }


  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Fill the Task details</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={values.title} className="form-control" required placeholder="Enter title here"
            onChange={e=>setValues({...values , title:e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input type="text" name="title" value={values.description} className="form-control" required placeholder="Enter description here"
            onChange={e=>setValues({...values , description:e.target.value})}/>
          </div>
          <button className="btn btn-success">Submit</button>
          <Link to={'/'} className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  );
};

export default Add;
