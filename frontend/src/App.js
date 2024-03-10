import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList/TaskList";
import Add from "./components/Add/Add";
import View from "./components/View/View";
import Update from "./components/Update/update";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [isEdited , setIsEdited] = useState(false);

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskList isEdited={isEdited} />}></Route>
          <Route path="/add" element={<Add  isEdited={isEdited} setIsEdited={setIsEdited}/>}></Route>
          <Route path="/update/:id" element={<Update isEdited={isEdited} setIsEdited={setIsEdited}/>}></Route>
          <Route path="/view/:id" element={<View />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
