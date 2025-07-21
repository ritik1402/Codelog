import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyTo, setReplyTo] = useState(null); 
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
    if (commentText.trim() === '') return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:8000/api/user/createcomment/${id}${parentId ? `?commentId=${parentId}` : ''}`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setCommentText('');
      setReplyTo(null); 
      fetchComments();
    } catch (error) {
      console.error('Failed to post comment:', error.response?.data || error.message);
    }
  };

  const renderComments = (comments, parentId = null) => {
    return comments
      .filter((c) => c.parentId === parentId)
      .map((comment) => (
        <div key={comment.id} className="ml-4 mt-4 border-l-2 pl-4 border-[#A27B5C]">
          <p className="text-[#DCD7C9]">{comment.content}</p>
          <button
            onClick={() => setReplyTo(comment.id)}
            className="text-sm text-[#A27B5C] underline mt-1"
          >
            Reply
          </button>

          {replyTo === comment.id && (
            <div className="mt-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-2 rounded bg-[#3E3E3E] text-white mb-2"
              />
              <button
                onClick={() => handleComment(comment.id)}
                className="bg-[#A27B5C] text-white px-4 py-1 rounded hover:bg-[#8d6542]"
              >
                Post Reply
              </button>
            </div>
          )}

         
          {renderComments(comments, comment.id)}
        </div>
      ));
  };

  if (!blog) return <div className="text-white p-6">Loading blog...</div>;

  return (
    <div className="p-6 bg-[#212121] text-[#DCD7C9] min-h-screen">
      {blog.image && (
        <img
          src={blog.image}
          alt="blog"
          className="w-full max-h-[400px] object-cover rounded-xl mb-6"
        />
      )}
      <h1 className="text-4xl font-bold text-[#A27B5C] mb-4">{blog.title}</h1>
      <p className="text-lg mb-6">{blog.content}</p>

      <hr className="my-6 border-[#A27B5C]" />

      <div className="mt-4">
        <h2 className="text-2xl text-[#A27B5C] mb-2">Comments</h2>

        
        <textarea
          className="w-full p-2 rounded bg-[#3E3E3E] text-white mb-4"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="bg-[#A27B5C] text-white px-4 py-2 rounded hover:bg-[#8d6542]"
          onClick={() => handleComment()}
        >
          Post Comment
        </button>

        <div className="mt-6">{renderComments(comments)}</div>
      </div>
    </div>
  );
};

export default DetailBlog;
