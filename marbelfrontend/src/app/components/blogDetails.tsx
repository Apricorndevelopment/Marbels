// components/blogDetails.tsx

import Image from "next/image";

interface BlogType {
  id: number;
  blog_name: string;
  blog_image: string;
  blog_desc: string;
  blog_type: string;
  post_by: string;
  created_at:string;
  }
  
  export default function BlogDetails({ blog }: { blog: BlogType }) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md my-8">
        <Image src={`http://127.0.0.1:8000/${blog.blog_image}`} alt={blog.blog_name} width={100} height={100} className="w-full h-[300px] object-cover rounded-md mb-6"/>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{blog.blog_name}</h1>
        <h2 className="font-semibold my-2">Blog Type - {blog.blog_type}</h2>
        <p className="text-sm text-gray-500 mb-4">
          Posted by <span className="font-semibold">{blog.post_by}</span> on {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-700 leading-7 whitespace-pre-line">{blog.blog_desc}</p>
      </div>
    );
  }
  