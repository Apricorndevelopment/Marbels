'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AddBlog = () => {
  const router = useRouter();

  const [blogName, setBlogName] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogShortDesc, setBlogShortDesc] = useState('');
  const [blogDesc, setBlogDesc] = useState('');
  const [postBy, setPostBy] = useState('');
  const [blogType, setBlogType] = useState('');
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('blog_name', blogName);
    formData.append('blog_slug', blogSlug);
    formData.append('blog_shortdesc', blogShortDesc);
    formData.append('blog_desc', blogDesc);
    formData.append('blog_type', blogType);
    formData.append('post_by', postBy);
    if (blogImage) {
      formData.append('blog_image', blogImage);
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/blogs', {
        method: 'POST',
        body: formData,
      });


      const result = await res.json();

      if (res.ok) {
        console.log('Blog added!');
        router.push('/dashboard/admin-dashboard/blog');
      } else {
        console.error('Failed to add blog', result);
        const errorMessages =
          result.errors
            ? Object.values(result.errors).flat() // flatten Laravel validation errors
            : [result.message || 'Something went wrong'];
        setErrors(errorMessages);
      }
    } catch (err) {
      console.error('Error:', err);
      setErrors(['Server error. Please try again later.']);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-auto max-w-4xl">
        <Link href="/dashboard/admin-dashboard/blog">
          <button className="bg-green-500 text-white py-2 px-5 text-xl mb-4">Go Back</button>
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-center">Add Blog</h1>

        {errors.length > 0 && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <ul className="list-disc list-inside">
              {errors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Blog Name:</label>
            <input
              type="text"
              value={blogName}
              onChange={(e) => setBlogName(e.target.value)}
              required
              className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blog Slug:</label>
            <input
              type="text"
              value={blogSlug}
              onChange={(e) => setBlogSlug(e.target.value)}
              required
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blog Type:</label>
            <input
              type="text"
              value={blogType}
              onChange={(e) => setBlogType(e.target.value)}
              required
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Blog Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md my-1 file:bg-blue-500 file:text-white 
            file:py-1 file:px-3 file:rounded-md 
            file:border-none file:cursor-pointer 
            hover:file:bg-blue-600 transition duration-300 "
            />
            {previewImage && <img src={previewImage} alt="Preview" className="w-40 mt-3 rounded shadow" />}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Short Description:</label>
            <textarea
              value={blogShortDesc}
              onChange={(e) => setBlogShortDesc(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Description:</label>
            <textarea
              value={blogDesc}
              onChange={(e) => setBlogDesc(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
              rows={5}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Posted By:</label>
            <input
              type="text"
              value={postBy}
              onChange={(e) => setPostBy(e.target.value)}
              required
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 mt-4 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
