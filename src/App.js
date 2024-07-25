import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TaskPage from './pages/TaskPage';
import { ToastContainer } from 'react-toastify';
import AddTask from './Components/AddTask';
import EditTaskPage from './pages/EditTaskPage';
import ViewSingleTaskPage from './pages/ViewSingleTaskPage';
import Navbar from './Components/Navbar';

function App() {
  return (
      <div className="">
        <ToastContainer/>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/tasks" element={<TaskPage/>} />
          <Route path="/"  element={<LoginPage/>} />
          <Route path='/add-task' element={<AddTask/>}/>
          <Route path='/edit-task/:id' element={<EditTaskPage/>}/>
          <Route path='/single-task/:id' element={<ViewSingleTaskPage/>}/>
          </Routes>
      </div>
  );
}

export default App;
