"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Link from "next/link";

interface Category {
  id: number;
  categorie_name: string;
}

interface Subcategory {
  subcategorie_name: string;
  subcategorie_slug: string;
  category_id: number;
  image: string | null;
}

const EditSubcategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [subcatName, setSubcatName] = useState<string>("");
  const [subcatSlug, setSubcatSlug] = useState<string>("");
  const [parentCatId, setParentCatId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, subRes] = await Promise.all([
          axios.get<Category[]>("http://127.0.0.1:8000/api/categories"),
          axios.get<Subcategory>(`http://127.0.0.1:8000/api/subcategories/${id}`)
        ]);

        setCategories(catRes.data);
        setSubcatName(subRes.data.subcategorie_name);
        setSubcatSlug(subRes.data.subcategorie_slug);
        setParentCatId(subRes.data.category_id.toString());

        if (subRes.data.image) {
          setExistingImageUrl(`http://127.0.0.1:8000/uploads/subcategories/${subRes.data.image}`);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to load subcategory data.");
      }
    }

    fetchData();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setSelectedImage(file);
      setError("");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!subcatName || !subcatSlug || !parentCatId) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("subcategorie_name", subcatName);
    formData.append("subcategorie_slug", subcatSlug);
    formData.append("category_id", parentCatId);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/subcategories/${id}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setSuccess("Subcategory updated successfully!");
      setTimeout(() => router.push("/dashboard/admin-dashboard/subcateg"), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error?: string }>;
        setError(
          axiosErr.response?.data?.error ?? axiosErr.message ?? "Update failed."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="p-8">
      <Link href="/dashboard/admin-dashboard/subcateg">
        <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">
          Go Back
        </button>
      </Link>

      <h1 className="text-2xl font-bold mb-6">Edit Subcategory</h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block font-medium">Subcategory Name</label>
          <input
            type="text"
            value={subcatName}
            onChange={(e) => setSubcatName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Subcategory Slug</label>
          <input
            type="text"
            value={subcatSlug}
            onChange={(e) => setSubcatSlug(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Parent Category</label>
          <select
            value={parentCatId}
            onChange={(e) => setParentCatId(e.target.value)}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categorie_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Subcategory Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {selectedImage ? (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="h-32 object-cover rounded"
              />
            </div>
          ) : (
            existingImageUrl && (
              <div className="mt-2">
                <img
                  src={existingImageUrl}
                  alt="Existing"
                  className="h-32 object-cover rounded"
                />
              </div>
            )
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Update Subcategory
        </button>
      </form>
    </div>
  );
};

export default EditSubcategory;
