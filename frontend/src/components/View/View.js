import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../config.json'
import { Link, useParams } from 'react-router-dom';

const View = () => {
  const [task, setTask] = useState([]);
  const {id} = useParams();
  
  const data = async () => {
    try {
      const result = await axios.get(`${config.endpoint}/${id}`);
      console.log('read',result.data)
      setTask(result.data);
      
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Task details</h1>
          <div className="mb-3">
            <strong>Title : {task.title}</strong>
          </div>
          <div className="mb-3">
            <strong>Title : {task.description}</strong>
          </div>
          <Link to={`/update/${task['_id']}`} className="btn btn-success">Edit</Link>
          <Link to={'/'} className="btn btn-primary ms-3">Back</Link>
      </div>
    </div>
  )
}

export default View
