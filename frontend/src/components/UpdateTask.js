import React, { useContext } from "react";
import { userContext } from "../context/userContext/userContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const UpdateTask = ({ inputFields, setInputFields, setUserTasks }) => {
  const { user, logout } = useContext(userContext);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User not available");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/tasks/updateTask/${inputFields.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...inputFields,
            updatedAt: new Date(),
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
        const updateTask = await response.json();
        console.log("update", updateTask.task);
        setUserTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updateTask.task._id ? updateTask.task : task
          )
        );
        toast.success(updateTask.msg);
        // Close the modal after successful update
        document.querySelector("#exampleModal .btn-close").click();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={inputFields.title}
          onChange={handleInput}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={inputFields.description}
          onChange={handleInput}
          required
        ></textarea>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={inputFields.status}
          onChange={handleInput}
        >
          <option value="to do">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit">Update Task</button>
      </form>
    </>
  );
};

export default UpdateTask;
