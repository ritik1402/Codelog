import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/api/user/getblog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const blog = res.data;
        setTitle(blog.title);
        setContent(blog.content);
        setExistingImage(blog.image); 
      } catch (error) {
        console.error("Failed to fetch blog:", error.response?.data || error.message);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      await axios.put(`http://localhost:8000/api/user/editblog/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Failed to update blog:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 text-[#DCD7C9]">
      <h2 className="text-4xl font-bold text-[#A27B5C] text-center mb-6">Edit Blog</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[#2C2C2C] p-6 rounded-2xl shadow-lg space-y-6 hover:border-[#A27B5C] hover:border-2 duration-300 ease-in-out"
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

        {existingImage && (
          <div>
            <p className="text-[#A27B5C] mb-2">Existing Image:</p>
            <img
              src={`http://localhost:8000${existingImage}`}
              alt="Blog"
              className="w-full max-h-[250px] object-cover rounded-xl mb-4"
            />
          </div>
        )}

        <div>
          <label className="block text-lg font-medium mb-1 text-[#A27B5C]">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-[#A27B5C] text-white font-bold px-6 py-2 rounded hover:bg-[#8d6542] transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
