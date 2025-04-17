'use client';

import { useEffect, useState } from 'react';

interface Seller {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminsellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/admin/sellers`)
      .then((res) => res.json())
      .then((data) => {
        setSellers(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch sellers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Registered Sellers</h1>

      {loading ? (
        <p>Loading sellers...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Registered At</th>
              </tr>
            </thead>
            <tbody>
              {sellers.length > 0 ? (
                sellers.map((seller) => (
                  <tr key={seller.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{seller.id}</td>
                    <td className="py-3 px-4">{seller.name}</td>
                    <td className="py-3 px-4">{seller.email}</td>
                    <td className="py-3 px-4 capitalize">{seller.role}</td>
                    <td className="py-3 px-4">{new Date(seller.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No sellers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
