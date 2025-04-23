import Image from "next/image";
import Link from "next/link";

export function Header1() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-1 gap-4">

        {/* Logo and Search */}
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/logoo.png"
              alt="Logo"
              width={40}
              height={20}
              className="h-auto w-auto"
            />
          </Link>

          <div className="flex border rounded-md overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search products"
              className="px-3 py-2 w-48 sm:w-72 text-black outline-none"
            />
            <button className="bg-yellow-400 text-black px-4 hover:bg-yellow-500 font-semibold">
              Search
            </button>
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-6 text-sm">
          <Link href="/auth" className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1">
            <i className="bi bi-person" /> <span>Sign In / Sign Up</span>
          </Link>

          <a href="#" className="hover:text-yellow-300 transition-colors duration-200 flex items-center gap-1">
            <i className="bi bi-heart" /> <span>Favorites</span>
          </a>

          {/* Social Icons */}
          <div className="flex gap-3 text-zinc-200">
            <a href="#"><i className="bi bi-facebook hover:text-amber-300 " /></a>
            <a href="#"><i className="bi bi-instagram hover:text-amber-300" /></a>
            <a href="#"><i className="bi bi-twitter hover:text-amber-300" /></a>
            <a href="#"><i className="bi bi-whatsapp hover:text-amber-300" /></a>
          </div>
        </div>
      </div>
    </header>
  );
}
