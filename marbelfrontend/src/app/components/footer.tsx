import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Marble Marketplace</h2>
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
            <li><Link href="/" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/enquiry" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <p className="mt-2 text-sm">📍 123 Marble Street, Stone City</p>
          <p className="text-sm">📧 abcd@gmail.com</p>
          <p className="text-sm">📞 +91 123234432</p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white transition"><i className="bi bi-facebook"></i></a>
            <a href="#" className="hover:text-white transition"><i className="bi bi-instagram"></i></a>
            <a href="#" className="hover:text-white transition"><i className="bi bi-twitter"></i></a>
            <a href="#" className="hover:text-white transition"><i className="bi bi-whatsapp"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Marble Marketplace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
