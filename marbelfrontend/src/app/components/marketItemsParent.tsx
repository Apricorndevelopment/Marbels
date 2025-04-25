"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MarketItem } from "./marketItems";

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

export function Sidebar({ setActiveMarket }: { setActiveMarket: (content: string[] | null) => void }) {
  const [isPermanent, setIsPermanent] = useState(false);
  const [markets, setMarkets] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const categoriesRes = await axios.get<Category[]>("http://127.0.0.1:8000/api/categories");
        const categoriesWithSubcategories: Category[] = await Promise.all(
          categoriesRes.data.map(async (category) => {
            const subRes = await axios.get<Subcategory[]>(
              `http://127.0.0.1:8000/api/subcategories/by-category/${category.id}`
            );
            return {
              ...category,
              subcategories: subRes.data,
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
      <h2 className="font-bold text-2xl mb-8">My Markets</h2>
      <div>
        {markets.map((market) => (
          <div
            className="py-3"
            key={market.id}
            onMouseEnter={() => !isPermanent && setActiveMarket(market.subcategories.map(sub => sub.subcategorie_name))}
            onMouseLeave={() => !isPermanent && setActiveMarket(null)}
            onClick={() => {
              if (isPermanent) {
                setActiveMarket(null);
                setIsPermanent(false);
              } else {
                setActiveMarket(market.subcategories.map(sub => sub.subcategorie_name));
                setIsPermanent(true);
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
