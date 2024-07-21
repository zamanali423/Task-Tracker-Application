import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext/userContext";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenSquare,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import UpdateTask from "./UpdateTask";
import { toast } from "react-toastify";

const GetTask = () => {
  const { user, logout } = useContext(userContext);
  const [userTasks, setUserTasks] = useState([]);
  const [choice, setChoice] = useState("ascending");
  const [view, setView] = useState({});
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
    title: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    status: "",
    email: "",
  });

  //! handle expired token
  const handleExpiredToken = async (response) => {
    const data = await response.json();
    if (data.msg === "Token Expired. Please log in again.") {
      logout();
      navigate("/login");
    } else {
      console.error("Unauthorized access");
    }
  };
  //! Get Tasks
  const getTasks = async () => {
    if (!user) {
      console.error("User not available");
      return;
    }
    try {
      const { email } = user;
      const response = await fetch(`http://localhost:3001/tasks/${email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 401) {
        handleExpiredToken(response);
      } else {
        const data = await response.json();
        setUserTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  //! Update Task
  const handleUpdate = (task) => () => {
    setInputFields({
      id: task._id,
      title: task.title,
      description: task.description,
      updatedAt: task.updatedAt,
      status: task.status,
    });
  };

  //! Delete Task
  const deleteTask = async (task) => {
    if (!user) {
      console.error("User not available");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/tasks/deleteTask/${task._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 401) {
        handleExpiredToken(response);
      } else {
        const deletedTask = await response.json();
        setUserTasks((prevTasks) =>
          prevTasks.filter((t) => t._id !== task._id)
        );
        toast.success(deletedTask.msg);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  //! Sort Tasks
  const sortTasks = async () => {
    if (!user) {
      console.error("User not available");
      return;
    }
    try {
      const { email } = user;
      const response = await fetch(
        `http://localhost:3001/tasks/sortTask/${email}?sort=${choice}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        toast.error(data.msg);
      } else {
        const sortedTasks = await response.json();
        setUserTasks(sortedTasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  //! Set Choice
  const handleChoice = (e) => {
    const selectedChoice = e.target.value;
    setChoice(selectedChoice);
  };

  //! Get Single Task
  const handleView = (task) => {
    setView(task);
  };

  useEffect(() => {
    getTasks();
  }, [user]);

  return (
    <>
      <div className="container">
        <label htmlFor="choice">Sorting:</label>
        <select
          name="choice"
          id="choice"
          value={choice}
          onChange={handleChoice}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        <button className="btn btn-primary ms-2" onClick={sortTasks}>
          Sort
        </button>

        <h2>Task List</h2>
        <table className="task-table">
          <thead>
            <tr>
              <th>Task #</th>
              <th>Title</th>
              <th>Description</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userTasks &&
              userTasks.map((task, index) => (
                <tr
                  key={task._id}
                  className={
                    task.status === "completed" ? "completed-task" : ""
                  }
                >
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description.slice(0, 10)}...</td>
                  <td>
                    {task.createdAt
                      ? new Date(task.createdAt).toISOString().slice(0, 19)
                      : ""}
                  </td>
                  <td>
                    {task.updatedAt
                      ? new Date(task.updatedAt).toISOString().slice(0, 19)
                      : ""}
                  </td>
                  <td>{task.status}</td>
                  <td>
                    <FontAwesomeIcon
                      className="icon"
                      icon={faEye}
                      onClick={() => handleView(task)}
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasScrolling"
                      aria-controls="offcanvasScrolling"
                    />
                    <FontAwesomeIcon
                      className="ms-2 icon"
                      icon={faPenSquare}
                      onClick={handleUpdate(task)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    />
                    <FontAwesomeIcon
                      className="ms-2 icon"
                      icon={faTrashAlt}
                      onClick={() => deleteTask(task)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <UpdateTask
                inputFields={inputFields}
                setInputFields={setInputFields}
                setUserTasks={setUserTasks}
              />
            </div>
          </div>
        </div>
      </div>

      {/* //! offcanvas */}
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
            {user.fullName}
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <h4>Title: {view.title}</h4>
          <p>
            <strong>Description:</strong> {view.description}
          </p>
          <p>
            <strong>CreatedAt: </strong>
            {view.createdAt}
          </p>
          <p>
            <strong>UpdatedAt: </strong>
            {view.updatedAt}
          </p>
          <p>
            <strong>Status:</strong>
            {view.status}
          </p>
        </div>
      </div>
    </>
  );
};

export default GetTask;
