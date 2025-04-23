"use client";

import { useEffect, useState } from "react";
import BlogDetails from "../../components/blogDetails";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";

interface Blog {
  id: number;
  blog_name: string;
  blog_image: string;
  blog_desc: string;
  blog_type: string;
  post_by: string;
  created_at: string;
}

export default function BlogDetailsPage() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`http://127.0.0.1:8000/api/blogs/${id}`);
          setBlog(res.data.data); 
        } catch (error) {
          console.error("Failed to fetch Blog:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  if (!loading && !blog) return notFound();

  return (
    <>
      {loading ? (
        <p>Loading Blog Details...</p>
      ) : (
        blog && <BlogDetails blog={blog} />
      )}
    </>
  );
}
