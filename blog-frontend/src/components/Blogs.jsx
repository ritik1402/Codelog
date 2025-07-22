import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import Modal from "./Modal";

const Blogs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/blogs");
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const truncate = (text, limit) => {
    return text?.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const confirmDelete = (e, id) => {
    e.stopPropagation();
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/user/deleteblog/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((b) => b.id !== deleteId));
    } catch (error) {
      console.error("Failed to delete blog:", error.response?.data || error.message);
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  if (loading) {
    return <div className="text-[#2C3639] text-center py-20 text-xl">Loading blogs...</div>;
  }

  if (!blogs.length) {
    return <div className="text-[#2C3639] text-center py-20 text-xl">No blogs found.</div>;
  }

  return (
    <div className="flex flex-wrap justify-evenly gap-4 py-8 min-h-screen bg-gradient-to-br from-[#A27B5C] to-[#DCD7C9]">
      {blogs.map((blog) => {
        const defaultImage = "/images/no-image.png";

        return (
          <div
            key={blog.id}
            className="flex flex-col p-4 w-[300px] h-[480px] m-4 rounded-3xl hover:scale-105 transition-transform duration-300 shadow-md border border-[#DCD7C9] bg-white/20 backdrop-blur-md"
          >
            <div
              className="cursor-pointer"
              onClick={() => navigate(`/detail/${blog.id}`)}
            >
              <img
                src={blog.image ? `http://localhost:8000${blog.image}` : defaultImage}
                alt={blog.title}
                className="rounded-2xl h-[160px] w-full object-cover border border-[#DCD7C9]"
              />

              <h2 className="p-2 text-xl text-[#2C3639] font-bold break-words">
                {blog.title}
              </h2>
              <h4 className="px-2 text-sm text-[#3F4E4F] break-words">
                {truncate(blog.content, 250)}
              </h4>
            </div>

            {user && user.id === blog.userId && (
              <div className="mt-auto flex justify-between px-2 pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit/${blog.id}`);
                  }}
                  className="bg-[#3F4E4F] text-[#DCD7C9] px-4 py-1 rounded-lg hover:bg-[#2C3639] transition"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => confirmDelete(e, blog.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default Blogs;
