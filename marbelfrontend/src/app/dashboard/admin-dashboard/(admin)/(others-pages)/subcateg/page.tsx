"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useRouter } from "next/navigation";

interface Subcategory {
  id: number;
  subcategorie_name: string;
  subcategorie_slug: string;
  category: {
    categorie_name: string;
  };
}

const SubcategoryPage = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories`)
      .then((res) => res.json())
      .then((data) => setSubcategories(data))
      .catch((err) => console.error("Failed to fetch subcategories", err));
  }, []);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this subcategory?");
    if (!confirm) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories/${id}`, {
        method: "DELETE",
      });
      setSubcategories((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <PageBreadcrumb pageTitle="Add Subcategory" />
      <h1 className='text-xl mb-4 font-bold'>Manage Subcategory</h1>
      <Link href="/dashboard/admin-dashboard/subcateg/add-subcateg">
        <button className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-xl transition duration-200'>Add Sub Category</button>
      </Link>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Subcategory Name</th>
              <th className="border px-4 py-2">Subcategory Slug</th>
              <th className="border px-4 py-2">Parent Category</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">No Subcategories added yet.</td>
              </tr>
            ) : (
              subcategories.map((subcategory, index) => (
                <tr key={subcategory.id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{subcategory.subcategorie_name}</td>
                  <td className="border px-4 py-2">{subcategory.subcategorie_slug}</td>
                  <td className="border px-4 py-2">{subcategory.category?.categorie_name}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => router.push(`/dashboard/admin-dashboard/subcateg/edit/${subcategory.id}`)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(subcategory.id)}
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

export default SubcategoryPage;
