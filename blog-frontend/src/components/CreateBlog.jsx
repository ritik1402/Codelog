import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // new state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await axios.post(
        "http://localhost:8000/api/user/createblog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Blog created successfully!", res.data);
      navigate("/");
    } catch (error) {
      console.error("Failed to create blog:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 text-[#DCD7C9]">
      <h2 className="text-4xl font-bold text-[#A27B5C] text-center mb-6">Create New Blog</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[#2C2C2C] p-6 rounded-2xl shadow-lg space-y-6 hover:border-[#A27B5C] hover:border-2 duration-300 ease-in-out"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-lg font-medium mb-1 text-[#A27B5C]">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#3E3E3E] text-white focus:outline-none"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-1 text-[#A27B5C]">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            className="w-full px-4 py-2 rounded bg-[#3E3E3E] text-white focus:outline-none"
            placeholder="Write your blog content here..."
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-1 text-[#A27B5C]">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 rounded bg-[#3E3E3E] text-white focus:outline-none"
          />
        </div>
        <div className="flex justify-between">
        <button
          type="submit"
          className="bg-[#A27B5C] text-white font-bold px-6 py-2 rounded hover:bg-[#8d6542] transition"
        >
          Post Blog
        </button>
         <button
    type="button"
    onClick={() => navigate("/")}
    className="bg-gray-600 text-white font-bold px-6 py-2 rounded hover:bg-gray-500 transition"
  >
    Cancel
  </button>
  </div>
      </form>
    </div>
  );
};

export default CreateBlog;
