import Image from "next/image";
import Link from "next/link";

export function Header1() {
  return (
    <div className="flex justify-between text-sm border-b flex-wrap bg-[#94f59af3] text-[#333333]">

      <div className="flex justify-between items-center gap-6 p-2">
        <div className="flex items-center">
        <Image src="/logoo.png" alt="Logo" width={50} height={20} style={{ height: "auto" }}/>
        </div>

        <div className="flex border rounded-lg overflow-hidden text-[#212529]">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-1 sm:py-2 outline-none text-[#333333] w-44 sm:w-72"
          />
          <button className="bg-blue-600 text-white px-2 sm:px:4">Search</button>
        </div>
      </div>

      <div className="flex justify-between items-center gap-6 p-2">
        <Link href="/auth" className="hover:text-amber-600">
          <i className="bi bi-person"></i> Sign In / Sign Up
        </Link>
        <a href="#" className="hover:text-gray-900 flex items-center">
          <i className="bi bi-heart"></i>{" "}
          <span className="ml-1">Favorites</span>
        </a>
        <div className="flex gap-2 text-zinc-600 hover:text-zinc-900">
          <a href="#">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#">
            {" "}
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#">
            <i className="bi bi-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
