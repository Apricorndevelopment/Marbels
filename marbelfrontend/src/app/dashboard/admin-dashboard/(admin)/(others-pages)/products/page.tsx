"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../../../../../utils/axiosInstance";

interface Product {
  id: number;
  product_name: string;
  product_slug: string;
  product_image: string | null;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserToken(token);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
        },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleEdit = (slug: string) => {
    router.push(`/dashboard/admin-dashboard/products/edit/${slug}`);
  };

  return (
    <div className="p-6">
      <PageBreadcrumb pageTitle="Add Products" />
      <h1 className="text-2xl font-bold mb-4">Product Section</h1>

      <Link href="/dashboard/admin-dashboard/products/add-product">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">
          Add Product
        </button>
      </Link>
      <Link href="/dashboard/admin-dashboard/products/add-bulk-product">
        <button className="bg-green-500 text-white px-4 py-2 ms-4 rounded-md hover:bg-green-700 transition duration-200">
          Add Bulk Product
        </button>
      </Link>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Slug</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product.id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{product.product_name}</td>
                  <td className="border px-4 py-2">{product.product_slug}</td>
                  <td className="border px-4 py-2">
                    {product.product_image ? (
                      <img src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${product.product_image}`} alt={product.product_name} className="w-16 h-16 object-cover rounded-md mx-auto" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(product.product_slug)}
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
