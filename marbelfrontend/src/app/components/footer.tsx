import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <Image src={"/logoo.png"} alt="Logo" width={50} height={50}></Image>
          <h2 className="text-xl font-semibold text-white mt-2">Stone Live Stock</h2>
          <p className="mt-2 text-sm">
            Your trusted platform for premium marble, granite, and stone materials. 
            Connecting buyers and sellers worldwide.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
            <li><Link href="/blogs" className="hover:text-white transition">Blogs</Link></li>
            <li><Link href="/enquiry" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Pages</h3>
          <ul className="mt-2 space-y-2">
            <li><Link href="/footer/shipping-policy" className="hover:text-white transition">Shipping & Delivery Policy</Link></li>
            <li><Link href="/footer/refund-policy" className="hover:text-white transition">Cancellation & Refund Policy</Link></li>
            <li><Link href="/footer/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/footer/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <p className="mt-2 text-sm">📍 123 Marble Street, Stone City</p>
          <p className="text-sm">📧 abcd@gmail.com</p>
          <p className="text-sm">📞 +91 XXXXXXXXXX</p>

          {/* Social Media Icons */}
          <div className="flex space-x-5 mt-4">
            <a href="https://www.instagram.com/stonelivestock/" className="hover:text-white transition"><i className="bi bi-instagram"></i></a>
            <a href="https://www.linkedin.com/company/stone-live-stock" className="hover:text-white transition"><i className="bi bi-linkedin"></i></a>
            <a href="https://www.facebook.com/stonelivestockcom/" className="hover:text-white transition"><i className="bi bi-facebook"></i></a>
            <a href="#" className="hover:text-white transition"><i className="bi bi-whatsapp"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Stone Live Stock. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
