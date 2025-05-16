"use client";

import { useEffect, useState } from "react";
import { MarketItem } from "./marketItems";
import axiosInstance from "../../../utils/axiosInstance";

interface Category {
  id: number;
  categorie_name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: number;
  subcategorie_name: string;
  category_id: number;
}

export function Sidebar({
  setActiveMarket,
}: {
  setActiveMarket: (content: Subcategory[] | null) => void;
}) {
  const [markets, setMarkets] = useState<Category[]>([]);
  const [permanentCategoryId, setPermanentCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const categoriesRes = await axiosInstance.get<Category[]>("/categories");
        const categoriesWithSubcategories: Category[] = await Promise.all(
          categoriesRes.data.map(async (category) => {
            const subRes = await axiosInstance.get<Subcategory[]>(
              `/subcategories/by-category/${category.id}`
            );
            const subcategoriesWithCategory = subRes.data.map((sub) => ({
              ...sub,
              category_id: category.id,
            }));
            return {
              ...category,
              subcategories: subcategoriesWithCategory,
            };
          })
        );
        setMarkets(categoriesWithSubcategories);
      } catch (error) {
        console.error("Error fetching categories or subcategories:", error);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  return (
    <aside className="p-4 mt-3">
      <h2 className="font-bold text-2xl mb-8 sm:mb-5">My Markets</h2>
      <div>
        {markets.map((market) => (
          <div
            className="py-5 sm:py-3"
            key={market.id}
            onMouseEnter={() => {
              if (permanentCategoryId === null) {
                setActiveMarket(market.subcategories);
              }
            }}
            onMouseLeave={() => {
              if (permanentCategoryId === null) {
                setActiveMarket(null);
              }
            }}
            onClick={() => {
              if (permanentCategoryId === market.id) {
                setPermanentCategoryId(null);
                setActiveMarket(null);
              } else {
                setPermanentCategoryId(market.id);
                setActiveMarket(market.subcategories);
              }
            }}
          >
            <MarketItem icon="/file.svg" name={market.categorie_name} />
          </div>
        ))}
      </div>
    </aside>
  );
}
