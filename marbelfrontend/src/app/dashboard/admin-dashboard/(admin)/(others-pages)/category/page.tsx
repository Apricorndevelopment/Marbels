"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../../../../../utils/axiosInstance";

interface Product {
  id: number;
  categorie_name: string;
  categorie_slug: string;
  category_image?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/categories/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleEdit = (id: number) => {
    // You can change this route as per your setup
    router.push(`/dashboard/admin-dashboard/category/edit/${id}`);
  };

  return (
    <div className="p-6">
      <PageBreadcrumb pageTitle="Add Category" />
      <h1 className="text-2xl font-bold mb-4">Category Section</h1>

      <Link href="/dashboard/admin-dashboard/category/add-categ">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
          Add Category
        </button>
      </Link>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Category Name</th>
              <th className="border px-4 py-2">Category Slug</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No categories found.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product.id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{product.categorie_name}</td>
                  <td className="border px-4 py-2">{product.categorie_slug}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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

export default Products;
