"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MarbleCard } from "../components/marbleCard";
import axiosInstance from "../../../utils/axiosInstance";

interface Product {
  product_slug: string;  // Add slug to the product interface
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
    axiosInstance.get("/categories")
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

        const res = await axiosInstance.get(`/products?${queryParams.toString()}`);
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
      <div className="bg-white shadow-xl rounded-md m-5">
      <h1 className="text-4xl font-semibold p-2 mb-4">Our Products</h1>
        {/* Category Filter */}
        <div className="flex items-start sm:gap-3 px-2 sm:px-3 mb-3">
          <span className="min-w-[80px] font-semibold text-gray-700">Category:</span>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <span
              onClick={() => handleCategoryClick(null)}
              className={`cursor-pointer px-1 sm:px-2 py-1 rounded text-sm ${!selectedCategory ? "bg-black text-white" : "bg-white text-black"}`}
            >
              All
            </span>
            {categories.map((cat) => (
              <span
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`cursor-pointer px-1 sm:px-2 py-1 rounded text-sm ${selectedCategory === cat.id ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {cat.categorie_name}
              </span>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="flex items-start sm:gap-3 px-2 sm:px-3 pb-3">
          <span className="min-w-[80px] font-semibold text-gray-700">Color:</span>
          <div className="flex flex-wrap gap-1">
            <span
              onClick={() => handleColorFilterChange("All")}
              className={`cursor-pointer px-1 sm:px-2 py-1 rounded text-sm ${!selectedColor ? "bg-black text-white" : "bg-white text-black"}`}
            >
              All
            </span>
            {colors.map((color) => (
              <span
                key={color}
                onClick={() => handleColorFilterChange(color)}
                className={`cursor-pointer px-1 sm:px-2 py-1 rounded text-sm ${selectedColor === color ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="p-5">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-5">
          {products.map((product) => (
            <MarbleCard
              key={product.product_slug}  // Use slug instead of id
              slug={product.product_slug}  // Pass slug instead of id
              imageUrl={`${process.env.NEXT_PUBLIC_API_URL}/storage/${product.product_image}`}
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
