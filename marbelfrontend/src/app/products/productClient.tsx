"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MarbleCard } from "../components/marbleCard";
import axiosInstance from "../../../utils/axiosInstance";

interface Product {
  product_slug: string;
  product_name: string;
  product_image: string;
  material_origin: string;
  material_type: string;
  color: string;
}

interface Category {
  id: number;
  categorie_name: string;
}

interface Subcategory {
  id: number;
  subcategorie_name: string;
}

const colors: string[] = [
  "Beige", "Black", "Blue", "Brown", "White", "Red", "Multicolor", "Green", "Grey",
  "Lilac", "Pink", "Yellow", "Gold", "Silver", "Orange", "Ivory", "Purple", "Bordeaux", "Rose", "Semi White"
];

const countries: string[] = [
  "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Canada", "Chile",
  "China", "Colombia", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany",
  "Greece", "Hungary", "India", "Indonesia", "Italy", "Japan", "Malaysia", "Mexico", "Netherlands",
  "New Zealand", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Romania",
  "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden",
  "Switzerland", "Thailand", "Turkey", "United Arab Emirates", "United Kingdom", "United States", "Vietnam"
];

const DropdownFilter = ({
  label,
  items,
  selected,
  onSelect,
}: {
  label: string;
  items: { label: string; value: string | number }[];
  selected: string | number | null;
  onSelect: (val: string | null) => void;
}) => (
  <div className="px-3 mb-4">
    <label className="block font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={selected ?? ""}
      onChange={(e) => onSelect(e.target.value || null)}
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
    >
      <option value="">All</option>
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  </div>
);

export default function ProductClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryIdFromURL = searchParams.get("category_id");
  const subcategoryIdFromURL = searchParams.get("subcategory_id");
  const colorFromURL = searchParams.get("color");
  const countryFromURL = searchParams.get("country");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const selectedCategory = categoryIdFromURL ? parseInt(categoryIdFromURL) : null;
  const selectedSubcategory = subcategoryIdFromURL ? parseInt(subcategoryIdFromURL) : null;
  const selectedColor = colorFromURL && colorFromURL !== "All" ? colorFromURL : null;
  const selectedCountry = countryFromURL && countryFromURL !== "All" ? countryFromURL : null;

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axiosInstance
        .get(`/subcategories/by-category/${selectedCategory}`)
        .then((res) => setSubcategories(res.data))
        .catch((err) => console.error("Failed to fetch subcategories:", err));
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory) queryParams.set("category_id", selectedCategory.toString());
        if (selectedSubcategory) queryParams.set("subcategory_id", selectedSubcategory.toString());
        if (selectedColor) queryParams.set("color", selectedColor);
        if (selectedCountry) queryParams.set("material_origin", selectedCountry);

        const res = await axiosInstance.get(`/products?${queryParams.toString()}`);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubcategory, selectedColor, selectedCountry]);

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

  return (
    <div>
      <div className="bg-white shadow-xl rounded-md m-5 p-4">
        <h1 className="text-2xl font-semibold mb-4">Filter Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {/* Category Dropdown */}
        <DropdownFilter
          label="Category"
          items={categories.map((c) => ({ label: c.categorie_name, value: c.id }))}
          selected={selectedCategory}
          onSelect={(val) => updateQueryParams({ category_id: val, subcategory_id: null })}
        />

        {/* Subcategory Dropdown */}
        {subcategories.length > 0 && (
          <DropdownFilter
            label="Subcategory"
            items={subcategories.map((s) => ({ label: s.subcategorie_name, value: s.id }))}
            selected={selectedSubcategory}
            onSelect={(val) => updateQueryParams({ subcategory_id: val })}
          />
        )}

        {/* Color Dropdown */}
        <DropdownFilter
          label="Color"
          items={colors.map((c) => ({ label: c, value: c }))}
          selected={selectedColor}
          onSelect={(val) => updateQueryParams({ color: val })}
        />

        {/* Country Dropdown */}
        <DropdownFilter
          label="Country"
          items={countries.map((c) => ({ label: c, value: c }))}
          selected={selectedCountry}
          onSelect={(val) => updateQueryParams({ country: val })}
        />
      </div>
        </div>


      {/* Products Section */}
      {loading ? (
        <p className="p-5">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-5">
          {products.length === 0 ? (
            <p className="col-span-full text-center">No products found.</p>
          ) : (
            products.map((product) => (
              <MarbleCard
                key={product.product_slug}
                slug={product.product_slug}
                imageUrl={`${process.env.NEXT_PUBLIC_API_URL}/storage/${product.product_image}`}
                title={product.product_name}
                countryName={product.material_origin}
                type={product.material_type}
                color={product.color}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
