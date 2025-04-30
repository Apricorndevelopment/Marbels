"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import axiosInstance from "../../../../../../../../utils/axiosInstance";

interface Category {
  id: number;
  categorie_name: string;
}

interface Subcategory {
  id: number;
  subcategorie_name: string;
  category_id: number;
}

const AddProduct = () => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageInputs, setImageInputs] = useState<number[]>([Date.now()]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [color, setColor] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [description, setDescription] = useState("");
  // const [keywords, setKeywords] = useState("");
  // const [tax, setTax] = useState("");
  const [isPopular, setIsPopular] = useState<"1" | "0" | "">("");
  const [materialOrigin, setMaterialOrigin] = useState("");
  const [provinceCity, setProvinceCity] = useState("");
  const [order, setOrder] = useState("");
  const [video, setVideo] = useState("");
  const [form, setForm] = useState({
    grade: '',
    size: '',
    surface: '',
    FOB_price: '',
  });


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch Categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories`);
        const data = await res.json();
        setSubcategories(data);
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      const filtered = subcategories.filter((sub) => sub.category_id.toString() === categoryId);
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
    setSubcategoryId(""); // reset subcategory when category changes
  }, [categoryId, subcategories]);

  const router = useRouter();

  const [selectedPort, setSelectedPort] = useState("India");
  const [port1, setPort1] = useState("India");
  const [port2, setPort2] = useState("");
  const [port3, setPort3] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleUpdatePorts = () => {
    const updatedPorts = [port1, port2, port3].filter((p) => p.trim() !== "");
    setSelectedPort(updatedPorts[0] || "India"); // default back to India if none
    setShowModal(false);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || images.length === 0 || !subcategoryId) {
      alert("Please fill in product name, select a subcategory, and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", name);
    formData.append("product_slug", slug);
    formData.append("category_id", categoryId);
    formData.append("subcategory_id", subcategoryId);
    formData.append("product_desc", description);
    formData.append("product_video", video);
    formData.append("material_type", materialType);
    formData.append("color", color);
    formData.append("min_order", order.toString());
    formData.append("material_origin", materialOrigin);
    formData.append("province_city", provinceCity);
    formData.append("is_popular", isPopular);
    // formData.append("keywords", keywords);
    // formData.append("tax", tax);

    // Add main image
    if (images[0]) {
      formData.append("product_image", images[0]);
    }

    // Add remaining images
    images.slice(1).forEach((img) => {
      formData.append("images[]", img);
    });

    if (selectedPort) {
      formData.append("port", selectedPort);
    }

    formData.append("grade", form.grade);
    formData.append("size", form.size);
    formData.append("surface", form.surface);
    formData.append("FOB_price", form.FOB_price);

    try {
      const response = await axiosInstance.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      console.log("Product created successfully:", response.data);
      router.push("/dashboard/admin-dashboard/products");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
          console.error("Request failed with status:", response.status);
          if (response.data.errors) {
            console.error("Validation errors:", response.data.errors);
          } else {
            console.error("Error response data:", response.data);
          }
        } else {
          console.error("No response received:", error.request);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
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

  const countries = [
    "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil", "Canada", "Chile",
    "China", "Colombia", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany",
    "Greece", "Hungary", "India", "Indonesia", "Italy", "Japan", "Malaysia", "Mexico", "Netherlands",
    "New Zealand", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Romania",
    "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden",
    "Switzerland", "Thailand", "Turkey", "United Arab Emirates", "United Kingdom", "United States", "Vietnam"
  ];


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <Link href="/dashboard/admin-dashboard/products">
          <button className="bg-green-500 text-white py-2 px-5 text-xl">Go Back</button>
        </Link>
        <h1 className="text-3xl font-bold mb-5 text-center">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ✅ Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ✅ Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug:</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* ✅ Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Images:</label>
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(img)} alt={`preview-${index}`} className="w-20 h-20 object-cover rounded-md border" />
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
                className="w-full p-2 border rounded-md my-1 file:bg-blue-500 file:text-white 
            file:py-1 file:px-3 file:rounded-md 
            file:border-none file:cursor-pointer 
            hover:file:bg-blue-600 transition duration-300"
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
            <input
              type="text"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Select Category:</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full mt-2 p-2 border rounded-md"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categorie_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Select Subcategory:</label>
            <select
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              required
              className="w-full mt-2 p-2 border rounded-md"
              disabled={!categoryId}
            >
              <option value="">Select a subcategory</option>
              {filteredSubcategories.map((subcat) => (
                <option key={subcat.id} value={subcat.id}>
                  {subcat.subcategorie_name}
                </option>
              ))}
            </select>
          </div>

          <div className="my-7 w-full max-w-5xl mx-auto">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Color:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                "Beige", "Black", "Blue", "Brown", "White", "Red", "Multicolor", "Green", "Grey",
                "Lilac", "Pink", "Yellow", "Gold", "Silver", "Orange", "Ivory", "Purple", "Bordeaux", "Rose", "Semi White"
              ].map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="color"
                    value={item}
                    checked={color === item}
                    onChange={() => setColor(item)}
                    className="form-radio text-blue-500"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="my-7">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Material Type:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                "Granite", "Marble", "Limestone", "Basalt", "Quartzite", "Sandstone", "Quartz", "Travertine",
                "BlueStone", "Soapstone", "Others", "Onyx", "Alabaster", "Pumice", "Terrazo", "Felsite",
                "Conglomerate", "Rhyolite", "Gypsum", "Andesite"
              ].map((item) => (
                <label key={item} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="materialType"
                    value={item}
                    checked={materialType === item}
                    onChange={() => setMaterialType(item)}
                    className="form-radio text-blue-500"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>


          <div className="py-4 flex flex-col sm:flex-row gap-3">
            <div className="w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Material Origin:</label>
              <select
                className="w-full p-2 border rounded-md"
                value={materialOrigin}
                onChange={(e) => setMaterialOrigin(e.target.value)}
                name="material_origin"
                required
              >
                <option value="">Select Material Origin</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">City/State:</label>
              <input
                type="text"
                value={provinceCity}
                onChange={(e) => setProvinceCity(e.target.value)}
                name="province_city"
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Is Popular:</label>
            <select
              className="w-full p-2 border rounded-md"
              value={isPopular}
              onChange={(e) => setIsPopular(e.target.value as "1" | "0" | "")}
              name="is_popular"
              required>
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>


          {/* Size Information (Single Entry) */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Grade */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Grade:</label>
              <select
                className="w-full p-2 border rounded"
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
              >
                <option value="">Select Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Size:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="e.g. 60x60"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
              />
            </div>

            {/* Surface */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Surface:</label>
              <select
                className="w-full p-2 border rounded"
                value={form.surface}
                onChange={(e) => setForm({ ...form, surface: e.target.value })}
              >
                <option value="">Select Surface</option>
                <option value="Polished">Polished</option>
                <option value="Honed">Honed</option>
                <option value="Brushed">Brushed</option>
              </select>
            </div>

            {/* FOB Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">FOB Price:</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="e.g. 12.5"
                value={form.FOB_price}
                onChange={(e) => setForm({ ...form, FOB_price: e.target.value })}
              />
            </div>
          </div>


          <div className="py-4">
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Port:</label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedPort}
                onChange={(e) => setSelectedPort(e.target.value)}
              >
                {[port1, port2, port3].filter((p) => p.trim() !== "").map((port, index) => (
                  <option key={index} value={port}>
                    {port}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
              >
                Update Ports
              </button>
            </div>

            {/* Modal for Changing Ports */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
                <div className="bg-white p-5 rounded-md border-2 shadow-lg w-96">
                  <h2 className="text-lg font-semibold mb-4">Change Ports</h2>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="text-sm text-gray-700">Port1:</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={port1}
                        onChange={(e) => setPort1(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">Port2:</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={port2}
                        onChange={(e) => setPort2(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">Port3:</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={port3}
                        onChange={(e) => setPort3(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpdatePorts}>
                      Update
                    </button>
                    <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>


          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">* Min Order:</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder((e.target.value))}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords:</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax (%):</label>
            <input
              type="number"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;