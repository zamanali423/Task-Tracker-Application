# Task-Tracker-Application

## Table of Contents
1.Overview
<br/>
2.Architecture
<br/>
3.Setup Instructions
<br/>
4.Usage Guide
<br/>
5.API Endpoints

## Overview
The Basic Task Tracker Application is a web application designed to help users manage their tasks effectively. Users can create, update, view, delete, and sort tasks. Each task has a title, description, creation date, update date, and status.

## Architecture
The application follows a typical client-server architecture with the following components:

<strong>Frontend:</strong> Built using React, the frontend handles the user interface and communicates with the backend through RESTful APIs.
<br/>
<strong>Backend:</strong> Developed with Node.js and Express, the backend manages task data and user authentication.
<br/>
<strong>Database:</strong> MongoDB is used to store task and user data.
## Component Diagram

    ```
    ┌─────────────┐      ┌─────────────┐      ┌──────────────┐
    │   Frontend  │<---->│   Backend   │<---->│   Database   │
    │ (React App) │      │ (Node.js)   │      │   (MongoDB)  │
    └─────────────┘      └─────────────┘      └──────────────┘

    ```

## Setup Instructions
Follow these steps to set up the Basic Task Tracker Application:

## Prerequisites
`Node.js (v14.x or higher)`
<br/>
`npm (v6.x or higher)`
<br/>
`MongoDB (v4.x or higher)`
<br/>
## Backend Setup
1.Clone the repository:    

    ```
    
    git clone https://github.com/zamanali423/Task-Tracker-Application
    cd task-tracker/backend

    ```

2.Install dependencies:

    ```
    
    npm install

    ```

3.Create a `.env` file in the `backend` directory and add the following environment variables:   

    ```

    PORT=3001
    MONGO_URI=mongodb://localhost:27017/task-tracker
    JWT_SECRET=your_jwt_secret

    ```

4.Start the backend server:

    ```

    npm start

    ```

## Frontend Setup
1.Navigate to the frontend directory: 

     ```
     
     cd ../frontend

     ```

2.Install dependencies:

    ```

    npm install

    ```

3.Start the frontend development server:

    ```

    npm start

    ```

## Accessing the Application
Open your web browser and navigate to `http://localhost:3000`.   

# Usage Guide
The following sections provide instructions on how to use the Basic Task Tracker Application.

## User Authentication
<strong>Login:</strong> Navigate to the login page and enter your credentials to log in.
<br/>
<strong>Logout:</strong> Click the logout button to log out of your account.
<br/>
## Task Management
<strong>View Tasks:</strong> The main page displays a list of tasks.
<br/>
<strong>Create Task:</strong> Click the "Create Task" button, fill in the task details, and save.
<br/>
<strong>Update Task:</strong> Click the edit icon next to a task, modify the details, and save.
<br/>
<strong>Delete Task:</strong> Click the delete icon next to a task to remove it.
<br/>
<strong>Sort Tasks:</strong> Use the sorting dropdown to sort tasks by creation date or status.
## API Endpoints
The backend provides the following RESTful API endpoints:

## Task Endpoints
### Get Tasks
    ```

    GET /tasks/:email

    ```
    Retrieves all tasks for a user.

### Create Task
    ```

    POST /tasks

    ```
    Creates a new task.

### Update Task
    ```

    PUT /tasks/:id

    ```
    Updates an existing task.

### Delete Task
    ```

    DELETE /tasks/:id

    ```
    Deletes a task

### Sort Task
    ```

    GET /tasks/sortTask/:email

    ```
    Sorts tasks based on the provided criteria.

## User Endpoints
### Login    
    ```

    POST /login

    ```
    Authenticates a user.

### Register
    ```

    POST /register

    ```
    Registers a new user.

## Example Code Snippets
### Backend: Fetch Tasks    

    ```

    app.get('/tasks/:email', async (req, res) => {
    try {
    const tasks = await Task.find({ email: req.params.email });
    res.json(tasks);
    } catch (error) {
    res.status(500).send('Server Error');
    }
    });

    ```

### Frontend: Display Tasks    

    ```

    const getTasks = async () => {
    const response = await fetch(`http://localhost:3001/tasks/${user.email}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    });
    const data = await response.json();
    setUserTasks(data);
    };

    useEffect(() => {
    getTasks();
    }, [user]);

    ```

### Frontend: Highlight Completed Tasks    

    ```

    .completed-task {
    background-color: #d4edda; /* Light green background */
    color: #155724; /* Dark green text */
    }
    
    ```

### Frontend: Conditional Row Highlighting    

    ```

    <tbody>
    {userTasks &&
    userTasks.map((task, index) => (
      <tr key={task._id} className={task.status === "completed" ? "completed-task" : ""}>
        <td>{index + 1}</td>
        <td>{task.title}</td>
        <td>{task.description.slice(0, 10)}...</td>
        <td>{new Date(task.createdAt).toISOString().slice(0, 19)}</td>
        <td>{new Date(task.updatedAt).toISOString().slice(0, 19)}</td>
        <td>{task.status}</td>
        <td>
          <FontAwesomeIcon icon={faEye} onClick={() => handleView(task)} />
          <FontAwesomeIcon icon={faPenSquare} onClick={() => handleUpdate(task)} />
          <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTask(task)} />
        </td>
      </tr>
    ))}
    </tbody>

     ```

This documentation provides a complete guide to understanding, setting up, and using the Basic Task Tracker Application.
<br/>
Adjust the paths, URLs, and environment variables as necessary to fit your specific project structure and configuration.
