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
  ];

  // ✅ Fetch categories from Laravel API (expects data inside 'data')
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
    <header className="flex items-center justify-between p-3 border-b bg-[#baffaad2] text-[#333333] relative">

      {/* Category Dropdown */}
      <div
        className="relative cursor-pointer"
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
        <div className="flex items-center gap-2">
          <i className="bi bi-list"></i> Categories
          <i className={`bi ${dropdownOpen ? "bi-chevron-up" : "bi-chevron-down"} text-sm transition-transform duration-200`}></i>
        </div>

        {dropdownOpen && (
          <div className="absolute left-0 z-10 top-full mt-2 w-56 bg-white shadow-lg border rounded">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category_id=${category.id}`}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                {category.categorie_name}
              </Link>
            ))}

          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} text-2xl`}></i>
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-7">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={pathname === link.href ? "font-bold underline" : "text-[#333333] hover:text-blue-600"}
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
              className="block w-full text-center py-2 border-b hover:bg-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Enquiry Button */}
      <Link href="/enquiry" className="bg-[#394246] hover:bg-[#202a2d] text-white text-center py-1 w-32 rounded">
        Enquire Now
      </Link>
    </header>
  );
}
