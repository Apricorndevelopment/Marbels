"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "../../../../../../../../../utils/axiosInstance";

interface Category {
  id: number;
  categorie_name: string;
}

interface Subcategory {
  id: number;
  subcategorie_name: string;
  category_id: number;
}

interface Product {
  id: number;
  product_name: string;
  product_slug: string;
  product_desc: string;
  product_video: string;
  product_image: string;
  material_type: string;
  color: string;
  min_order: number;
  material_origin: string;
  province_city: string;
  port: string;
  grade: string;
  size: string;
  surface: string;
  FOB_price: string;
  subcategory_id: number | "";
  category_id: number | "";
  is_popular: string;
}

const countries = [
  "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Canada", "Chile",
  "China", "Colombia", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany",
  "Greece", "Hungary", "India", "Indonesia", "Italy", "Japan", "Malaysia", "Mexico", "Netherlands",
  "New Zealand", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Romania",
  "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden",
  "Switzerland", "Thailand", "Turkey", "United Arab Emirates", "United Kingdom", "United States", "Vietnam"
];

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product>({
    id: 0,
    product_name: "",
    product_slug: "",
    product_desc: "",
    product_video: "",
    product_image: "",
    material_type: "",
    color: "",
    min_order: 0,
    material_origin: "",
    province_city: "",
    port: "",
    grade: "",
    size: "",
    surface: "",
    FOB_price: "",
    subcategory_id: "",
    category_id: "",
    is_popular: "0",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  // images ka type aise define karo
  const [images, setImages] = useState<(File | string)[]>([]);
  const [imageInputs, setImageInputs] = useState<number[]>([Date.now()]); // To manage multiple image inputs

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        const fetchedProduct = res.data;
        setProduct({
          id: fetchedProduct.id,
          product_name: fetchedProduct.product_name || "",
          product_slug: fetchedProduct.product_slug || "",
          product_desc: fetchedProduct.product_desc || "",
          product_video: fetchedProduct.product_video || "",
          product_image: fetchedProduct.product_image || "",
          material_type: fetchedProduct.material_type || "",
          color: fetchedProduct.color || "",
          min_order: fetchedProduct.min_order || 0,
          material_origin: fetchedProduct.material_origin || "",
          province_city: fetchedProduct.province_city || "",
          port: fetchedProduct.port || "",
          grade: fetchedProduct.grade || "",
          size: fetchedProduct.size || "",
          surface: fetchedProduct.surface || "",
          FOB_price: fetchedProduct.FOB_price || "",
          subcategory_id: Number(fetchedProduct.subcategory_id) || 0,
          category_id: Number(fetchedProduct.category_id) || 0,
          is_popular: fetchedProduct.is_popular ?? "0",
        });
        if (fetchedProduct.images && Array.isArray(fetchedProduct.images)) {
          setImages(fetchedProduct.images.map((imgUrl: string) => imgUrl));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const res = await axiosInstance.get("/subcategories");
        setSubcategories(res.data);
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };


    fetchProduct();
    fetchCategories();
    fetchSubcategories();
  }, [id]);

  useEffect(() => {
    if (product.category_id) {
      const filtered = subcategories.filter(
        (sub) => sub.category_id === Number(product.category_id)
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [product.category_id, subcategories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, event.target.files[0]]);
    }
  };
  const addImageInput = () => {
    setImageInputs([...imageInputs, Date.now()]);
  };

  const removeLastInput = () => {
    if (imageInputs.length > 1) {
      setImageInputs(imageInputs.slice(0, -1));
      setImages(images.slice(0, -1));
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const colors = [
    "Beige", "Black", "Blue", "Brown", "White", "Red", "Multicolor", "Green", "Grey",
    "Lilac", "Pink", "Yellow", "Gold", "Silver", "Orange", "Ivory", "Purple", "Bordeaux", "Rose", "Semi White"
  ];

  const materialTypes = [
    "Granite", "Marble", "Limestone", "Basalt", "Quartzite", "Sandstone", "Quartz", "Travertine",
    "BlueStone", "Soapstone", "Others", "Onyx", "Alabaster", "Pumice", "Terrazo", "Felsite",
    "Conglomerate", "Rhyolite", "Gypsum", "Andesite"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("product_name", product.product_name);
    formData.append("product_slug", product.product_slug);
    formData.append("product_desc", product.product_desc);
    formData.append("product_video", product.product_video);
    formData.append("material_type", product.material_type);
    formData.append("color", product.color);
    formData.append("min_order", product.min_order.toString());
    formData.append("material_origin", product.material_origin);
    formData.append("province_city", product.province_city);
    formData.append("port", product.port);
    formData.append("grade", product.grade);
    formData.append("size", product.size);
    formData.append("surface", product.surface);
    formData.append("FOB_price", product.FOB_price);
    formData.append("subcategory_id", product.subcategory_id.toString());
    formData.append("category_id", product.category_id.toString());
    formData.append("is_popular", product.is_popular);

    // Append all selected images
    images.forEach((file) => {
      formData.append("images[]", file);
    });

    try {
      await axiosInstance.post(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully!");
      router.push("/dashboard/admin-dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-6">
      <Link href="/dashboard/admin-dashboard/products">
        <button className="bg-green-500 text-white py-2 px-5 text-xl">Go Back</button>
      </Link>
      <h1 className="text-3xl font-bold mb-5 text-center">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name:</label>
          <input type="text" name="product_name" value={product.product_name} onChange={handleChange} placeholder="Product Name" className="border px-4 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug:</label>
          <input type="text" name="product_slug" value={product.product_slug} onChange={handleChange} placeholder="Slug" className="border px-4 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
          <textarea name="product_desc" value={product.product_desc} onChange={handleChange} placeholder="Description" className="border px-4 py-2 w-full h-32 resize-none" />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Images:</label>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img src={img instanceof File ? URL.createObjectURL(img) : `${process.env.NEXT_PUBLIC_API_URL}/storage/${img}` } alt={`preview-${index}`} className="w-20 h-20 object-cover rounded-md border"/>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {imageInputs.map((inputId) => (
            <input
              key={inputId}
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md my-1 file:bg-blue-500 file:text-white file:py-1 file:px-3 file:rounded-md file:border-none file:cursor-pointer hover:file:bg-blue-600 transition duration-300"
            />
          ))}

          <div className="mt-2 ms-2 flex gap-2">
            <button
              type="button"
              onClick={addImageInput}
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm"
            >
              + Add More
            </button>
            {imageInputs.length > 1 && (
              <button
                type="button"
                onClick={removeLastInput}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
              >
                - Remove Last
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Video URL:</label>
          <input type="text" name="product_video" value={product.product_video} onChange={handleChange} placeholder="Video URL" className="border px-4 py-2 w-full" />
        </div>
        <div>
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Category:</label>
            <select
              name="category_id"
              value={product.category_id}
              onChange={(e) => {
                const selectedCategoryId = Number(e.target.value);
                setProduct({
                  ...product,
                  category_id: selectedCategoryId,
                  subcategory_id: "", // Reset subcategory when category changes
                });
              }}
              className="border px-4 py-2 w-full"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Subcategory:</label>
            <select
              name="subcategory_id"
              value={product.subcategory_id}
              onChange={(e) =>
                setProduct({
                  ...product,
                  subcategory_id: e.target.value === "" ? "" : Number(e.target.value),
                })
              }
              className="border px-4 py-2 w-full"
              disabled={!product.category_id}
            >
              <option value="">Select Subcategory</option>
              {filteredSubcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.subcategorie_name}
                </option>
              ))}
            </select>
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">Color:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {colors.map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="color"
                  value={item}
                  checked={product.color === item}
                  onChange={() => setProduct({ ...product, color: item })}
                  className="form-radio text-blue-500"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Material Type:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {materialTypes.map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="material_type"
                  value={item}
                  checked={product.material_type === item}
                  onChange={() => setProduct({ ...product, material_type: item })}
                  className="form-radio text-blue-500"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order:</label>
          <input type="number" name="min_order" value={product.min_order} onChange={handleChange} placeholder="Minimum Order" className="border px-4 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Material Origin:</label>
          <select className="w-full p-2 border rounded-md" value={product.material_origin} onChange={handleChange} name="material_origin" >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City:</label>
          <input type="text" name="province_city" value={product.province_city} onChange={handleChange} placeholder="Province/City" className="border px-4 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Port:</label>
          <input type="text" name="port" value={product.port} onChange={handleChange} placeholder="Port" className="border px-4 py-2 w-full" />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Is Popular?</label>
          <select value={product.is_popular} onChange={(e) => setProduct({ ...product, is_popular: e.target.value })} className="w-full p-2 border rounded-md" name="is_popular">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Grade:</label>
          <input type="text" name="grade" value={product.grade} onChange={handleChange} placeholder="Grade" className="border px-4 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Size:</label>
          <input type="text" name="size" value={product.size} onChange={handleChange} placeholder="Size" className="border px-4 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Surface:</label>
          <input type="text" name="surface" value={product.surface} onChange={handleChange} placeholder="Surface" className="border px-4 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">FOB Price:</label>
          <input type="text" name="FOB_price" value={product.FOB_price} onChange={handleChange} placeholder="FOB Price" className="border px-4 py-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
