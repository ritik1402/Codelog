import axios from "axios";

const API_URL = "http://localhost:8000/api/user";
const token = localStorage.getItem("token");

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data.blogs;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    await axios.delete(`${API_URL}/deleteblog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to delete blog:", error);
    throw error;
  }
};


 export const fetchMyBlogs = async () => {
    try {
      
    //   const response = await axios.get(`${API_URL}/blogs`);

      const res = await axios.get(`${API_URL}/myblogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (error) {
      console.error("Error fetching user's blogs:", error.response?.data || error.message);
      if (error.response?.status === 401) navigate("/login");
    } 
  };

 