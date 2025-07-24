import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  {toast} from 'react-hot-toast';

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await axios.post(
        "http://localhost:8000/api/user/createblog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success('Blog created successfully',{
        style: {backgroundColor: 'green', color:'white'}
      });

      console.log("Blog created successfully!", res.data);
      navigate("/");
    } catch (error) {
      toast.error("Failed to create blog",{
        style: {backgroundColor: 'red', color:'white'}
      });
      console.error("Failed to create blog:", error.response?.data || error.message);
    }
  };

 return (
   <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#A27B5C] to-[#DCD7C9] text-[#2C3639]">
     <h2 className="text-4xl font-bold text-center mb-8 text-[#2C3639]">
       Create New Blog
     </h2>

     <form
       onSubmit={handleSubmit}
       className="max-w-2xl mx-auto bg-white/20 backdrop-blur-md border border-[#DCD7C9] p-8 rounded-3xl shadow-md space-y-6"
       encType="multipart/form-data"
     >
       <div>
         <label className="block text-lg font-semibold mb-2 text-[#2C3639]">
           Title
         </label>
         <input
           type="text"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
           className="w-full px-4 py-2 rounded-xl bg-[#3F4E4F] text-[#DCD7C9] placeholder-[#DCD7C9]/70 focus:outline-none focus:ring-2 focus:ring-[#2C3639]"
           placeholder="Enter blog title"
           required
         />
       </div>

       <div>
         <label className="block text-lg font-semibold mb-2 text-[#2C3639]">
           Content
         </label>
         <textarea
           value={content}
           onChange={(e) => setContent(e.target.value)}
           rows="8"
           className="w-full px-4 py-2 rounded-xl bg-[#3F4E4F] text-[#DCD7C9] placeholder-[#DCD7C9]/70 focus:outline-none focus:ring-2 focus:ring-[#2C3639]"
           placeholder="Write your blog content here..."
           required
         />
       </div>

       <div>
         <label className="block text-lg font-semibold mb-2 text-[#2C3639]">
           Image
         </label>
         <input
           type="file"
           accept="image/*"
           onChange={(e) => setImage(e.target.files[0])}
           className="w-full px-4 py-2 rounded-xl bg-[#3F4E4F] text-[#DCD7C9] file:bg-[#2C3639] file:text-[#DCD7C9] file:font-semibold file:px-4 file:py-1 file:rounded file:border-0 cursor-pointer"
         />
       </div>

       <div className="flex justify-between">
         <button
           type="submit"
           className="bg-[#2C3639] text-[#DCD7C9] font-bold px-6 py-2 rounded-xl hover:bg-[#3F4E4F] transition cursor-pointer"
         >
           Post Blog
         </button>
         <button
           type="button"
           onClick={() => navigate("/")}
           className="bg-[#3F4E4F] text-[#DCD7C9] font-bold px-6 py-2 rounded-xl hover:bg-[#2C3639] transition cursor-pointer"
         >
           Cancel
         </button>
       </div>
     </form>
   </div>
 );


};

export default CreateBlog;
