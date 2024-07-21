import React, { useContext, useState } from "react";
import { userContext } from "../context/userContext/userContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Tasks = ({ setShowCreateTasks }) => {
  const { user, logout } = useContext(userContext);
  const navigate = useNavigate();
  const [inputFields, setinputFields] = useState({
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    status: "To Do",
    email: "",
  });

  const handleInput = (e) => {
    setinputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User not available");
      return;
    }
    const { email } = user;
    try {
      const response = await fetch(
        "http://localhost:3001/tasks/createTask/newTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...inputFields,
            createdAt: new Date(),
            updatedAt: new Date(),
            status: inputFields.status,
            email: email,
          }),
        }
      );

      if (response.status === 401) {
        const data = await response.json();
        if (data.msg === "Token Expired. Please log in again.") {
          logout();
          navigate("/login");
        } else {
          console.error("Unauthorized access");
        }
      } else {
        const data = await response.json();
        console.log(data);
        toast.success(data.msg);
        setinputFields({
          title: "",
          description: "",
          createdAt: "",
          updatedAt: "",
          status: "To Do",
        });
        setShowCreateTasks(false);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="mainForm2">
      <div className="container2">
        <form className="task-form" onSubmit={handleSubmit}>
          <h2>Create a Task</h2>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={inputFields.title}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={inputFields.description}
              onChange={handleInput}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={inputFields.status}
              onChange={handleInput}
              required
            >
              <option value="to-do">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button className="button" type="submit">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tasks;
