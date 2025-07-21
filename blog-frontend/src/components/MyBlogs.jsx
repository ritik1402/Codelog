import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:8000/api/user/myblogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyBlogs(res.data);
    } catch (error) {
      console.error("Error fetching user's blogs:", error.response?.data || error.message);
      if (error.response?.status === 401) navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const truncate = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/user/deleteblog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh blog list
      setMyBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Failed to delete blog:", error.response?.data || error.message);
    }
  };

  if (loading) return <p className="text-center text-white py-10">Loading...</p>;

  return (
    <div className="flex flex-wrap justify-evenly gap-4 py-8 min-h-screen">
      {myBlogs.length > 0 ? (
        myBlogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col p-4 w-[300px] h-[450px] m-4 rounded-4xl hover:border-[#A27B5C] border-2 hover:scale-105 transition-transform bg-[#212121] border-white"
          >
            <img
              src={blog.image || "/images/placeholder.jpg"}
              alt="blog"
              className="rounded-2xl h-[160px] object-cover"
            />
            <h2 className="p-2 text-2xl text-[#A27B5C] font-bold">{blog.title}</h2>
            <h4 className="p-2 text-md text-[#DCD7C9]">
              {truncate(blog.content || blog.desc, 250)}
            </h4>
            <div className="mt-4 flex justify-between px-2 pt-2">
              <button
                onClick={() => handleEdit(blog.id)}
                className="bg-[#A27B5C] text-white px-4 py-1 rounded hover:bg-[#8d6542] transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white text-center w-full py-10">No blogs found.</p>
      )}
    </div>
  );
};

export default MyBlogs;
