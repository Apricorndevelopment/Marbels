"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { MarbleCard } from "../components/marbleCard";

interface Product {
  id: number;
  product_name: string;
  product_image: string;
  material_origin: string;
  material_type: string;
  color: string;
  category_id: number;
}

interface Category {
  id: number;
  categorie_name: string;
}

export default function ProductClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryIdFromURL = searchParams.get("category_id");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const selectedCategory = categoryIdFromURL ? parseInt(categoryIdFromURL) : null;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products whenever selectedCategory changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "http://127.0.0.1:8000/api/products";
        if (selectedCategory) {
          url += `?category_id=${selectedCategory}`;
        }

        const res = await axios.get(url);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Handle category click
  const handleCategoryClick = (categoryId: number | null) => {
    if (categoryId === null) {
      router.push("/products", { scroll: false });
    } else {
      router.push(`/products?category_id=${categoryId}`, { scroll: false });
    }
  };

  return (
    <div>
      <h1 className="text-4xl p-5 font-semibold">Our Products</h1>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 px-5 mb-4">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-2 rounded border ${
            selectedCategory === null ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`px-4 py-2 rounded border ${
              selectedCategory === cat.id ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {cat.categorie_name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="p-5">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
          {products.map((product) => (
            <MarbleCard
              key={product.id}
              id={product.id.toString()}
              imageUrl={`http://127.0.0.1:8000/storage/${product.product_image}`}
              title={product.product_name}
              countryName={product.material_origin}
              type={product.material_type}
              color={product.color}
            />
          ))}
        </div>
      )}
    </div>
  );
}
