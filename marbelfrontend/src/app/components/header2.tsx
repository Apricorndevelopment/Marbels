"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";

interface NavLink {
  name: string;
  href: string;
}

interface Category {
  id: number;
  categorie_name: string;
  categorie_slug: string;
}

export function Header2() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPermanent, setIsPermanent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Buying Requests", href: "/request" },
    { name: "Slab In Stock", href: "/slabs" },
    { name: "Blogs", href: "/blogs" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-1 border-b border-slate-700 bg-slate-800 text-white sticky top-0 z-10 shadow-md">
      
      {/* Category Dropdown */}
      <div
        className="relative cursor-pointer select-none"
        onMouseEnter={() => !isPermanent && setDropdownOpen(true)}
        onMouseLeave={() => !isPermanent && setDropdownOpen(false)}
        onClick={() => {
          if (isPermanent) {
            setDropdownOpen(false);
            setIsPermanent(false);
          } else {
            setDropdownOpen(true);
            setIsPermanent(true);
          }
        }}
      >
        <div className="flex items-center gap-2 hover:text-yellow-300 transition-colors duration-200">
          <i className="bi bi-list text-lg"></i> Categories
          <i className={`bi ${dropdownOpen ? "bi-chevron-up" : "bi-chevron-down"} text-sm transition-transform duration-200`} />
        </div>

        {dropdownOpen && (
          <div className="absolute left-0 z-10 top-full mt-2 w-60 bg-white text-black shadow-xl border border-gray-300 rounded-md overflow-hidden transition-all duration-200">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category_id=${category.id}`}
                className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-150"
              >
                {category.categorie_name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white hover:text-yellow-300 transition-colors duration-200">
          <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} text-2xl`}></i>
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-7">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`transition-colors duration-200 ${
              pathname === link.href
                ? "font-semibold underline text-yellow-400"
                : "hover:text-yellow-300"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="absolute top-14 left-0 w-full z-20 bg-[#ffee93] shadow-md flex flex-col items-center md:hidden">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block w-full text-center py-2 border-b border-slate-300 hover:bg-yellow-200 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Enquiry Button */}
      <Link
        href="/enquiry"
        className="bg-yellow-400 hover:bg-yellow-500 text-black text-center py-2 w-32 rounded-md font-medium transition-colors duration-200"
      >
        Enquire Now
      </Link>
    </header>
  );
}
