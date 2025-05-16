"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Header1() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken && storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null); 
    router.push("/auth");
  };
  

  const getDashboardPath = () => {
    switch (role) {
      case "admin":
        return "/dashboard/admin-dashboard";
      case "seller":
        return "/dashboard/seller-dashboard";
      case "user":
        return "/dashboard/user-dashboard";
      default:
        return "/";
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-8xl mx-auto flex flex-wrap items-center justify-between px-2 sm:px-4 py-1 gap-4">
        {/* Logo and Search */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <Link href="/" className="flex items-center">
            <Image src="/logoo.png" alt="Logo" width={40} height={20} />
          </Link>
          <div className="flex border rounded-md overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search products"
              className="px-3 py-2 w-40 sm:w-72 text-black outline-none"
            />
            <button className="bg-yellow-400 text-black px-4 hover:bg-yellow-500 font-semibold">
              Search
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-10 sm:gap-8 text-sm">
          {role ? (
            <div className="flex gap-5 items-center">
              <Link href={getDashboardPath()} className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1">
              <i className="bi bi-person-circle" /> <span> Dashboard</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-white hover:text-yellow-300">
              <svg
                  className="fill-white group-hover:fill-yellow-300"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.1 19.247c-.414 0-.75-.336-.75-.75v-4.252h-1.5v4.252c0 1.243 1.007 2.25 2.25 2.25h3.4c1.243 0 2.25-1.007 2.25-2.25V5.496c0-1.243-1.007-2.25-2.25-2.25h-3.4c-1.243 0-2.25 1.007-2.25 2.25v4.249h1.5V5.496c0-.414.336-.75.75-.75h3.4c.414 0 .75.336.75.75v13.001c0 .414-.336.75-.75.75h-3.4zM3.25 11.998c0 .216.092.411.238.548l4.607 4.61c.293.293.768.293 1.061 0 .293-.293.293-.768 0-1.061l-3.345-3.347h10.189c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H5.811l3.344-3.343c.293-.293.293-.768 0-1.061a.75.75 0 0 0-1.06 0l-4.572 4.574A.75.75 0 0 0 3.25 11.998z"
                    fill="currentColor"
                  />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1"
            >
              <i className="bi bi-person" /> <span>Sign In / Sign Up</span>
            </Link>
          )}

          {/* Social Icons */}
          <div className="flex gap-3 text-zinc-200">
            <a href="https://www.instagram.com/stonelivestock/"><i className="bi bi-instagram hover:text-amber-300" /></a>
            <a href="https://www.linkedin.com/company/stone-live-stock"><i className="bi bi-linkedin hover:text-amber-300" /></a>
            <a href="https://www.facebook.com/stonelivestockcom/"><i className="bi bi-facebook hover:text-amber-300" /></a>
            <a href="#"><i className="bi bi-whatsapp hover:text-amber-300" /></a>
          </div>
        </div>
      </div>
    </header>
  );
}
