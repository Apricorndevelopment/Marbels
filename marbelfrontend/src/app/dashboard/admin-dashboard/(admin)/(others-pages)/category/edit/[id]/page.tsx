"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "../../../../../../../../../utils/axiosInstance";

const EditCategoryPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    categorie_name: "",
    categorie_slug: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axiosInstance.get(`/categories/${id}`);
        setFormData({
          categorie_name: res.data.categorie_name,
          categorie_slug: res.data.categorie_slug,
        });

        if (res.data.image) {
          setExistingImageUrl(`${process.env.NEXT_PUBLIC_API_URL}/uploads/categories/${res.data.image}`);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    if (id) fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("categorie_name", formData.categorie_name);
    data.append("categorie_slug", formData.categorie_slug);
    if (selectedImage) {
      data.append("image", selectedImage);
    }

    try {
      await axiosInstance.post(`/categories/${id}?_method=PUT`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Category updated successfully!");
      router.push("/dashboard/admin-dashboard/category");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed.");
    }
  };

  return (
    <div className="p-8">
      <Link href="/dashboard/admin-dashboard/category">
        <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">
          Go Back
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            name="categorie_name"
            value={formData.categorie_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category Slug</label>
          <input
            type="text"
            name="categorie_slug"
            value={formData.categorie_slug}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-3 py-2 rounded-md"
          />
          {selectedImage ? (
            <div className="mt-2">
              <img  src={URL.createObjectURL(selectedImage)}  alt="Selected"  className="h-32 object-cover rounded"/>
            </div>
          ) : existingImageUrl ? (
            <div className="mt-2">
              <img  src={existingImageUrl}  alt="Existing"  className="h-32 object-cover rounded"/>
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCategoryPage;
