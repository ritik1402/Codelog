import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import Modal from "./Modal";
import DropDown from "./DropDown";

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

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/edit/${id}`);
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
            className="relative flex flex-col p-4 w-[300px] h-[480px] m-4 rounded-3xl hover:scale-105 transition-transform duration-300 shadow-md border border-[#DCD7C9] bg-white/20 backdrop-blur-md cursor-pointer"
            onClick={() => navigate(`/detail/${blog.id}`)}
          >
            
            
            <div className="flex ">
            <img
              src={blog.image ? `http://localhost:8000${blog.image}` : defaultImage}
              alt={blog.title}
              className="rounded-2xl h-[160px] w-full object-cover border border-[#DCD7C9]"
            />
            {user && user.id === blog.userId && (
              // <div
              //   className="absolute top-4 right-4 z-10"
              //   onClick={(e) => e.stopPropagation()}
              // >
                <DropDown
                  onEdit={(e) => handleEdit(e, blog.id)}
                  onDelete={(e) => confirmDelete(e, blog.id)}
                />
              // </div>
            )}
            </div>
            <h2 className="p-2 text-xl text-[#2C3639] font-bold break-words uppercase">
              {blog.title}
            </h2>
            <h4 className="px-2 text-sm text-[#3F4E4F] break-words">
              {truncate(blog.content, 250)}
            </h4>
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
