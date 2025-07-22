import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/blogs");

        // const blogArray = Array.isArray(res.data)
        //   ? res.data
        //   : Array.isArray(res.data.data)
        //   ? res.data.data
        //   : [];

        setBlogs(res.data.blogs);
        console.log("Fetched blogs:", res?.data);
      } catch (error) {
        console.error("Error fetching blogs from server:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const truncate = (text, limit) => {
    return text?.length > limit ? text.slice(0, limit) + "..." : text;
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20 text-xl">
        Loading blogs...
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="text-white text-center py-20 text-xl">
        No blogs found.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-evenly gap-4 py-8 min-h-screen">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="flex flex-col p-4 w-[300px] h-[450px] m-4 rounded-4xl hover:border-[#A27B5C] border-2 hover:scale-105 transition-transform bg-[#212121] border-white cursor-pointer"
          onClick={() => navigate(`/detail/${blog.id}`)}
        >
          <img
            src={`http://localhost:8000${blog.image}`}
            alt={blog.title}
            className="rounded-2xl h-[160px] object-cover"
          />

          <h2 className="p-2 text-2xl text-[#A27B5C] font-bold">
            {blog.title}
          </h2>
          <h4 className="p-2 text-md text-[#DCD7C9]">
            {truncate(blog.content, 250)}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
