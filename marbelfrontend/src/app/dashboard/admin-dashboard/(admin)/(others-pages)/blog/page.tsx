'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { useRouter } from 'next/navigation';

interface Blog {
  id: number;
  blog_name: string;
  blog_image: string | null;
  post_by: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        const blogList = Array.isArray(data.data) ? data.data : [];
        setBlogs(blogList);
      })
      .catch((err) => console.error('Failed to fetch blogs', err));
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:8000/api/blogs/${id}`, {
        method: 'DELETE',
      });
      setBlogs((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <PageBreadcrumb pageTitle="Add Blogs" />
      <h1 className="text-xl mb-4 font-bold">Manage Blogs</h1>
      <Link href="/dashboard/admin-dashboard/blog/add-blog">
        <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-xl transition duration-200">Add Blog</button>
      </Link>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Blog Name</th>
              <th className="border px-4 py-2">Blog Image</th>
              <th className="border px-4 py-2">Posted By</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No Blogs added yet.
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <tr key={blog.id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{blog.blog_name}</td>
                  <td className="border px-4 py-2">
                    {blog.blog_image ? (
                      <img src={`http://127.0.0.1:8000/${blog.blog_image}`} alt={blog.blog_name} className="w-16 h-16 object-cover rounded-md mx-auto" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="border px-4 py-2">{blog.post_by}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => router.push(`/dashboard/admin-dashboard/blog/edit/${blog.id}`)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPage;
