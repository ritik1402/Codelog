import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

const Login = () => {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formdata.email || !formdata.password) {
      toast.error("Please fill in all fields", {
        style: { backgroundColor: "red" , color: "white" },
      });
      console.log("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/user/login", {
        email: formdata.email,
        password: formdata.password,
      });

      const { user, token } = res.data;

      if (user && token) {
        login(user, token); 
        toast.success("Login successful", {
          style: { backgroundColor: "green" , color: "white" },
        });
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Login successful");
        navigate("/");
      } else {
        toast.error("Invalid email or password", {style: { backgroundColor: "red" , color: "white" }});
        console.log("Login failed: missing user or token");
      }
    } catch (error) {
      toast.error("Login error", {style: { backgroundColor: "red" , color: "white" }});
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="h-full w-full z-40">
      <h2 className="text-2xl font-bold mb-4 text-[#A27B5C] text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formdata.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#DCD7C9] text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formdata.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#DCD7C9] text-black"
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#A27B5C] rounded text-white hover:bg-[#8e6849]"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
