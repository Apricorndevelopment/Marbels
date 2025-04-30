'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Blog {
  blog_name: string;
  blog_slug: string;
  blog_type?: string;
  blog_shortdesc?: string;
  blog_desc?: string;
  blog_image: string | null;
  post_by?: string;
}

const EditBlogPage = () => {
  const [form, setForm] = useState<Blog>({
    blog_name: '',
    blog_slug: '',
    blog_type: '',
    blog_shortdesc: '',
    blog_desc: '',
    blog_image: null,
    post_by: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.status && data.data) {
            const blog = data.data;
            setForm({
              blog_name: blog.blog_name,
              blog_slug: blog.blog_slug,
              blog_type: blog.blog_type,
              blog_shortdesc: blog.blog_shortdesc,
              blog_desc: blog.blog_desc,
              blog_image: blog.blog_image,
              post_by: blog.post_by,
            });
          }
        })
        .catch((err) => console.error('Failed to fetch blog', err));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('blog_name', form.blog_name);
    formData.append('blog_slug', form.blog_slug);
    formData.append('blog_type', form.blog_type || '');
    formData.append('blog_shortdesc', form.blog_shortdesc || '');
    formData.append('blog_desc', form.blog_desc || '');
    formData.append('post_by', form.post_by || '');

    if (imageFile) {
      formData.append('blog_image', imageFile);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, {
        method: 'POST',
        body: formData,
        headers: {
          'X-HTTP-Method-Override': 'PUT',
        },
      });

      const result = await res.json();
      if (result.status) {
        alert('Blog updated successfully!');
        router.push('/dashboard/admin-dashboard/blog');
      } else {
        alert('Failed to update blog.');
      }
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard/admin-dashboard/blog">
          <button className="bg-green-600 text-white px-4 py-2 rounded mb-6">
            Go Back
          </button>
        </Link>
  
        <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>
  
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Name: </label>
            <input
              type="text"
              name="blog_name"
              value={form.blog_name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Slug: </label>
            <input
              type="text"
              name="blog_slug"
              value={form.blog_slug}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Type: </label>
            <input
              type="text"
              name="blog_type"
              value={form.blog_type || ''}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Posted By: </label>
            <input
              type="text"
              name="post_by"
              value={form.post_by || ''}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description: </label>
            <textarea
              name="blog_shortdesc"
              value={form.blog_shortdesc || ''}
              onChange={handleChange}
              className="w-full p-3 border rounded-md h-24 resize-none"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Description: </label>
            <textarea
              name="blog_desc"
              value={form.blog_desc || ''}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 border rounded-md h-36 resize-none"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Image: </label>
            {form.blog_image && !imageFile && (
              <img src={`${process.env.NEXT_PUBLIC_API_URL}/${form.blog_image}`} alt="Current" className="w-24 h-24 object-cover rounded-md mb-3"/>
            )}
            {imageFile && (
              <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-24 h-24 object-cover rounded-md mb-3"/>
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border p-2 rounded-md file:bg-blue-500 file:text-white 
                file:py-1 file:px-4 file:rounded-md 
                file:border-none file:cursor-pointer 
                hover:file:bg-blue-600 transition duration-300"
            />
          </div>
  
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default EditBlogPage;
