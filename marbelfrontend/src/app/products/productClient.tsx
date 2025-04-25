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

const colors: string[] = [
  "Beige", "Black", "Blue", "Brown", "White", "Red", "Multicolor", "Green", "Grey",
  "Lilac", "Pink", "Yellow", "Gold", "Silver", "Orange", "Ivory", "Purple", "Bordeaux", "Rose", "Semi White"
];

export default function ProductClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryIdFromURL = searchParams.get("category_id");
  const colorFromURL = searchParams.get("color");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const selectedCategory = categoryIdFromURL ? parseInt(categoryIdFromURL) : null;
  const selectedColor = colorFromURL && colorFromURL !== "All" ? colorFromURL : null;

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to fetch categories:", err));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory) queryParams.set("category_id", selectedCategory.toString());
        if (selectedColor) queryParams.set("color", selectedColor);

        const res = await axios.get(`http://127.0.0.1:8000/api/products?${queryParams.toString()}`);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedColor]);

  const updateQueryParams = (newParams: Record<string, string | null>) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });

    router.push(`/products?${currentParams.toString()}`, { scroll: false });
  };

  const handleCategoryClick = (categoryId: number | null) => {
    updateQueryParams({ category_id: categoryId?.toString() || null });
  };

  const handleColorFilterChange = (color: string) => {
    updateQueryParams({ color: color === "All" ? null : color });
  };

  return (
    <div>
      <h1 className="text-4xl p-5 font-semibold">Our Products</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 px-5 mb-3">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-3 py-1 rounded border ${!selectedCategory ? "bg-black text-white" : "bg-white text-black"}`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`px-3 py-1 rounded border ${selectedCategory === cat.id ? "bg-black text-white" : "bg-white text-black"}`}
          >
            {cat.categorie_name}
          </button>
        ))}
      </div>

      {/* Color Filter */}
      <div className="flex flex-wrap gap-2 px-5 mb-3">
        <button
          onClick={() => handleColorFilterChange("All")}
          className={`px-2 py-1 rounded border ${!selectedColor ? "bg-black text-white" : "bg-white text-black"}`}
        >
          All Colors
        </button>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorFilterChange(color)}
            className={`px-2 py-1 rounded border ${selectedColor === color ? "bg-black text-white" : "bg-white text-black"}`}
          >
            {color}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="p-5">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-5">
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
