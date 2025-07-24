import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import DropDown from "./DropDown";
import { toast } from "react-hot-toast";
import Loadder from "./Loadder";
import { fetchMyBlogs } from "./Services/blogServices";

const MyBlogs = () => {
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchMyBlogs();
        setMyBlogs(data);
      } catch (error) {
        console.error("error in fetching my blog:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const truncate = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/edit/${id}`);
  };

  const confirmDelete = (e, id) => {
    e.stopPropagation();
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/api/user/deleteblog/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMyBlogs((prev) => prev.filter((blog) => blog.id !== deleteId));
      toast.success("Blog deleted successfully!", {
        style: { backgroundColor: "green", color: "white" },
      });
      setShowModal(false);
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete blog", {
        style: { backgroundColor: "red", color: "white" },
      });
      console.error(
        "Failed to delete blog:",
        error.response?.data || error.message
      );
    }
  };

  const defaultImage = "/images/no-image.png";

  if (loading) return <Loadder />;

  return (
    <div className="flex flex-wrap justify-evenly gap-6 py-10 px-4 min-h-screen bg-gradient-to-br from-[#A27B5C] to-[#DCD7C9] relative">
      {myBlogs.length > 0 ? (
        myBlogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => navigate(`/detail/${blog.id}`)}
            className="relative flex flex-col justify-between w-[300px] h-[480px] p-4 rounded-3xl border border-[#DCD7C9] bg-white/20 backdrop-blur-md text-[#2C3639] cursor-pointer hover:scale-[1.03] hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            <div>
              <div className="flex justify-between">
                <img
                  src={
                    blog.image
                      ? `http://localhost:8000${blog.image}`
                      : defaultImage
                  }
                  alt="blog"
                  className="w-full h-[160px] object-cover rounded-xl mb-2 border border-[#DCD7C9]"
                />
                {/* <div
                  className="absolute  z-10"
                  onClick={(e) => e.stopPropagation()}
                > */}
                <DropDown
                  onEdit={(e) => handleEdit(e, blog.id)}
                  onDelete={(e) => confirmDelete(e, blog.id)}
                />
                {/* </div> */}
              </div>

              <h2 className="text-2xl font-bold text-[#2C3639] mb-2 break-words uppercase">
                {blog.title}
              </h2>
              <p className="text-[#3F4E4F] text-sm break-words">
                {truncate(blog.content || blog.desc || "", 200)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-[#2C3639] text-center w-full py-10">
          No blogs found.
        </p>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default MyBlogs;
