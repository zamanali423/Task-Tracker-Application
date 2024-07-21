import React, { useState } from "react";
import CreateTasks from "../components/CreateTasks";
import GetTask from "../components/GetTask";

const Home = () => {
  const [showCreateTasks, setShowCreateTasks] = useState(false);
  const [showGetTasks, setShowGetTasks] = useState(false);

  const handleCreateTaskClick = () => {
    setShowCreateTasks(true);
    setShowGetTasks(false);
  };
  const handleGetTaskClick = () => {
    setShowGetTasks(true);
    setShowCreateTasks(false);
  };

  return (
    <>
      <div className="my-5 container">
        <button className="btn btn-primary" onClick={handleGetTaskClick}>
          Get Tasks
        </button>
        <button
          className="btn btn-primary ms-3"
          onClick={handleCreateTaskClick}
        >
          Create Tasks
        </button>
      </div>
      {showCreateTasks && (
        <CreateTasks setShowCreateTasks={setShowCreateTasks} />
      )}
      {showGetTasks && <GetTask />}
    </>
  );
};

export default Home;
