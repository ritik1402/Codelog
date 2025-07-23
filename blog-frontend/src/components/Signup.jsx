import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/Validation";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
  
    const emailResult = validateEmail(email);
    if (!emailResult.valid) {
      toast.error(emailResult.message, {
        style: { background: "red", color: "white" },
      });
      return;
    }

    const passResult = validatePassword(password);
    if (!passResult.valid) {
      toast.error(passResult.message, {
        style: { background: "red", color: "white" },
      });
      return;
    }
    if(!form.username || !form.email || !form.password) {
      toast.error(passResult.message, {
        style: { background: "red", color: "white" },
      });
      
      } else {
       const res = axios.post("http://localhost:8000/api/user/register",form)
         .then((response) => {
          toast.success("Signup successful!", {
            style: { background: "green", color: "white" },
          },);
           console.log("Signup successful!", response.data);
         })
         
         .catch((error) => {
          toast.error("Account already exists!", {
            style: { background: "red", color: "white" },
          });
           console.error("error in creating account", error);
         });
         

        }
    // console.log("Signup form submitted:", form);
    navigate("/auth");
    
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-[#A27B5C] text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#DCD7C9] text-black"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#DCD7C9] text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#DCD7C9] text-black"
        />
        <button
          type="submit"
          className="w-full py-2 bg-[#A27B5C] rounded text-white hover:bg-[#8e6849]"
        >
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Signup;
