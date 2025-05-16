"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import Link from "next/link";
import Image from "next/image";

type Subcategory = {
  id: number;
  subcategorie_name: string;
  subcategorie_slug: string;
  image: string;
  image_url: string | null;
  category_id: number;
  category?: {
    id: number;
    categorie_name: string;
  };
};


export function StoneLib() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    const fetchStones = async () => {
      try {
        const res = await axiosInstance.get("/subcategories/by-category/1");
        setSubcategories(res.data);
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      }
    };

    fetchStones();
  }, []);

  return (
    <aside className="p-5 bg-white border shadow-lg">
      <h3 className="font-bold text-3xl">Stone Library</h3>
      <div className="flex flex-wrap sm:ps-5 items-center justify-center sm:justify-start gap-6 sm:gap-8 mt-7">
        {subcategories.map((item, index) => (
          <Link key={item.id} href={`/products?category_id=1&subcategory_id=${item.id}`}>
            <div
              key={index}
              className="flex items-center justify-center flex-col gap-6 p-6"
            >
              <Image className="border-0 rounded-[50%] w-22 h-22 transform transition-transform duration-500 hover:rotate-360" src={item.image_url || "/fallback-image.jpg"} width={22} height={22} alt={item.subcategorie_name} />
              <span className="text-gray-700 font-xl text-center">{item.subcategorie_name}</span>
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-gray-700">From over 200+ countries with more than 20,000+</p>
    </aside>
  );
}
