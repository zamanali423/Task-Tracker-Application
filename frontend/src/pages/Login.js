import React, { useContext, useState } from "react";
import { userContext } from "../context/userContext/userContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(userContext);
  const [inputFields, setinputFields] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setinputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchData = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputFields),
      });
      const data = await fetchData.json();
      console.log(data);
      if (!fetchData.ok) {
        toast.error(data.msg);
      }
      const token = data.user.tokens[0].token;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/");
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mainForm">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputFields.email}
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputFields.password}
              onChange={handleInput}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
