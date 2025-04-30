"use client";
import BlogCard from "../components/blogCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

interface blog {
  id: number;
  blog_name: string;
  blog_image: string;
  blog_shortdesc: string;
  blog_type: string;
  post_by: string;
  created_at:string;
}

export default function BlogSectionPage() {
 const [blogs, setBlogs] = useState<blog[]>([]);
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/blogs');
        const blogList = Array.isArray(res.data.data) ? res.data.data : [];
        setBlogs(blogList);
      } catch (error) {
        console.error("Failed to fetch Blogs:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBlogs();
  }, []); 
  

  return (
    <div className="p-6 sm:p-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Blogs</h1>

      {loading ? (
        <p>Loading Blogs... </p>
      ):(
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      )}
    </div>
  );
}
