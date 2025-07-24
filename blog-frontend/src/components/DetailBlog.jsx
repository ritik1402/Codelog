import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import DropDown from "./DropDown";
import { ChevronDown } from "lucide-react";

const DetailBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8000/api/user/getblog/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBlog(res.data);
    } catch (error) {
      console.error(
        "Failed to fetch blog:",
        error.response?.data || error.message
      );
    }
  };

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8000/api/user/getcomments/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(res.data);
    } catch (error) {
      console.error(
        "Failed to fetch comments:",
        error.response?.data || error.message
      );
    }
  };

  const handleComment = async (parentId = null) => {
    const text = parentId ? replyTexts[parentId] : commentText;
    if (!text?.trim()) return;
    ("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8000/api/user/createcomment/${id}${
          parentId ? `?commentId=${parentId}` : ""
        }`,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (parentId) {
        setReplyTexts((prev) => ({ ...prev, [parentId]: "" }));
        toast.success("Comment posted successfully", {
          style: { backgroundColor: "green", color: "white" },
        });
      } else {
        setCommentText("");
        toast.success("Comment reply posted successfully", {
          style: { backgroundColor: "green", color: "white" },
        });
      }

      setReplyTo(null);
      fetchComments();
    } catch (error) {
      toast.error("Failed to post comment", {
        style: { backgroundColor: "red", color: "white" },
      });
      console.error(
        "Failed to post comment:",
        error.response?.data || error.message
      );
    }
  };

  const renderComments = (commentsList) => {
    return commentsList.map((comment) => (
      <div key={comment.id} className=" mt-4  ml-4 border-[#A27B5C] ">
        <p className="text-[#A27B5C] text-shadow-sm tracking-wider rounded-2xl bg-[#DCD7C9] p-2 pl-4  font-bold ">
          {comment.content}
        </p>
        <div className="flex flex-row items-center gap-2 ml-4 mt-2">
          <button
            onClick={() =>
              setReplyTo(replyTo === comment.id ? null : comment.id)
            }
            className="text-sm text-black/50 hover:underline  cursor-pointer font-bold"
          >
            Reply
          </button>
          {user && user.id === comment.userId && (
            <button
              onClick={() => handleDeleteComment(comment.id)}
              className="text-sm text-red-700 font-bold tracking-wider hover:font-bold ml-2 hover:underline transition-all duration-300 ease-in-out cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>

        {replyTo === comment.id && (
          <div className="mt-2">
            <textarea
              value={replyTexts[comment.id] || ""}
              onChange={(e) =>
                setReplyTexts((prev) => ({
                  ...prev,
                  [comment.id]: e.target.value,
                }))
              }
              placeholder="Write a reply"
              className="w-full p-2 rounded bg-[#3E3E3E] text-white mb-2"
            ></textarea>
            <button
              onClick={() => handleComment(comment.id)}
              className="bg-[#A27B5C] text-white px-4 py-1 rounded hover:bg-[#8d6542] cursor-pointer"
            >
              Post Reply
            </button>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="">{renderComments(comment.replies)}</div>
        )}
      </div>
    ));
  };

  const handleEdit = () => {
    navigate(`/edit/${blog.id}`);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/api/user/deletecomment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Comment deleted successfully",{
        style:{
          backgroundColor: 'green',color: 'white',
        }
      });
      fetchComments();
    } catch (error) {
      toast.error("Failed to delete comment",{
        style:{
          backgroundColor: 'red',color: 'white',
        }
        });
      console.log(
        "Failed to delete comment:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/user/deleteblog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      navigate("/");
    } catch (error) {
      console.error(
        "Failed to delete blog:",
        error.response?.data || error.message
      );
    }
  };

  if (!blog) return <div className="text-white p-6">Loading blog...</div>;

  return (
    <div className="p-6 min-h-screen  bg-gradient-to-br from-[#A27B5C] to-[#DCD7C9] text-[#2C3639] transition-colors duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto p-6 relative">
        <div className="flex justify-between items-center ">
          <h1 className="text-4xl text-center font-bold text-[#2C3639] mb-4 transition-all duration-300 tracking-widest text-shadow-amber-400 uppercase">
            {blog.title}
          </h1>
          <DropDown
            onEdit={handleEdit}
            onDelete={() => setShowDeleteModal(true)}
          />
        </div>
        <div className="flex flex-col gap-4 mt-8">
          {blog.image && (
            <img
              src={`http://localhost:8000${blog.image}`}
              alt="blog"
              className="w-100 h-100 object-cover rounded-xl mb-6 border  border-[#DCD7C9] shadow-md transition-all duration-500"
            />
          )}
          <div className="w-full p-4 border-2 rounded-2xl">
            <p className="text-lg text-[#000000] mb-6 leading-relaxed transition-opacity duration-500 ease-in-out text-justify tracking-wide p-4">
              {blog.content}
            </p>
          </div>
        </div>

        {/* {user && user.id === blog.userId && (
          <DropDown
            onEdit={handleEdit}
            onDelete={() => setShowDeleteModal(true)}
          />
        )} */}

        <hr className="my-6 border-[#3F4E4F] transition-opacity duration-300" />
      </div>

      <div className="mt-4 max-w-7xl  mx-auto ">
        <h2 className="text-2xl text-[#2C3639] font-semibold mb-2 transition-all duration-300">
          Comments
        </h2>

        <textarea
          className="w-full p-3 rounded-xl bg-[#3F4E4F] text-[#DCD7C9] placeholder-[#DCD7C9]/70 mb-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#A27B5C] shadow-sm"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button
          className="bg-[#A27B5C] hover:bg-[#8d6542] text-white px-5 py-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
          onClick={() => handleComment()}
        >
          Post Comment
        </button>

        <div className="mt-6 transition duration-300 ease-in-out">
          {renderComments(comments)}
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default DetailBlog;
