import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import Modal from './Modal';

const DetailBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8000/api/user/getblog/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlog(res.data);
    } catch (error) {
      console.error('Failed to fetch blog:', error.response?.data || error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8000/api/user/getcomments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    } catch (error) {
      console.error('Failed to fetch comments:', error.response?.data || error.message);
    }
  };

  const handleComment = async (parentId = null) => {
    const text = parentId ? replyTexts[parentId] : commentText;
    if (!text?.trim()) return;;''

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8000/api/user/createcomment/${id}${parentId ? `?commentId=${parentId}` : ''}`,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (parentId) {
        setReplyTexts((prev) => ({ ...prev, [parentId]: '' }));
      } else {
        setCommentText('');
      }

      setReplyTo(null); 
      fetchComments();
    } catch (error) {
      console.error('Failed to post comment:', error.response?.data || error.message);
    }
  };

  const renderComments = (commentsList) => {
  return commentsList.map((comment) => (
    <div key={comment.id} className="ml-4 mt-4 border-l-2 pl-4 border-[#A27B5C]">
      <p className="text-[#DCD7C9]">{comment.content}</p>

      <button
        onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
        className="text-sm text-[#A27B5C] underline mt-1"
      >
        Reply
      </button>

      {replyTo === comment.id && (
        <div className="mt-2">
          <textarea
            value={replyTexts[comment.id] || ''}
            onChange={(e) =>
              setReplyTexts((prev) => ({ ...prev, [comment.id]: e.target.value }))
            }
            placeholder="Write a reply"
            className="w-full p-2 rounded bg-[#3E3E3E] text-white mb-2"
          ></textarea>
          <button
            onClick={() => handleComment(comment.id)}
            className="bg-[#A27B5C] text-white px-4 py-1 rounded hover:bg-[#8d6542]"
          >
            Post Reply
          </button>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4">
          {renderComments(comment.replies)}
        </div>
      )}
    </div>
  ));
};


  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/edit/${id}`);
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
      console.error("Failed to delete blog:", error.response?.data || error.message);
    }
  };

  if (!blog) return <div className="text-white p-6">Loading blog...</div>;

 return (
  <div className="p-6 min-h-screen bg-gradient-to-br from-[#A27B5C] to-[#DCD7C9] text-[#2C3639] transition-colors duration-500 ease-in-out">
    
    {blog.image && (
      <img
        src={`http://localhost:8000${blog.image}`}
        alt="blog"
        className="w-[300px] max-h-[400px] object-cover rounded-xl mb-6 border border-[#DCD7C9] shadow-md transition-all duration-500 "
      />
    )}

    <h1 className="text-4xl text-center font-bold text-[#2C3639] mb-4 transition-all duration-300">
      {blog.title}
    </h1>

    <p className="text-lg text-[#3F4E4F] mb-6 leading-relaxed transition-opacity duration-500 ease-in-out">
      {blog.content}
    </p>

    {user && user.id === blog.userId && (
      <div className="mt-auto flex justify-between px-2 pt-2 animate-fade-in">
        <button
          onClick={(e) => handleEdit(e, blog.id)}
          className="bg-[#3F4E4F] hover:bg-[#2C3639] text-[#DCD7C9] px-5 py-2 rounded-md transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteModal(true);
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Delete
        </button>
      </div>
    )}

    <hr className="my-6 border-[#3F4E4F] transition-opacity duration-300" />

    <div className="mt-4">
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
        className="bg-[#A27B5C] hover:bg-[#8d6542] text-white px-5 py-2 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
        onClick={() => handleComment()}
      >
        Post Comment
      </button>

      <div className="mt-6 animate-fade-in">{renderComments(comments)}</div>
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
