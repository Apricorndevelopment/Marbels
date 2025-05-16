'use client';

import React, { useEffect, useState } from 'react';

interface StockProduct {
  product_name: string;
  stock: number;
}

interface StockResponse {
  stockproduct: {
    data: StockProduct[];
    current_page: number;
    last_page: number;
  };
  message: string;
}

const StockPage = () => {
  const [stockData, setStockData] = useState<StockProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchStockData = async (page: number = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stock?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: StockResponse = await res.json();
      setStockData(data.stockproduct.data);
      setCurrentPage(data.stockproduct.current_page);
      setLastPage(data.stockproduct.last_page);
    } catch (err) {
      setError('Failed to fetch stock data');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const getStockStatus = (stock: number) => {
    if (stock === 0 || stock === null) {
      return { label: 'Out of Stock', color: 'bg-blue-600', percent: 0 };
    } else if (stock <= 20) {
      return { label: `${stock} Low Stock`, color: 'bg-red-600', percent: stock };
    } else {
      return { label: `${stock} High Stock`, color: 'bg-green-600', percent: Math.min(stock, 100) };
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      fetchStockData(newPage);
    }
  };

  if (loading) return <p>Loading stock data...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 border rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Stock Report</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Items</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Stock</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((product, index) => {
              const { label, color, percent } = getStockStatus(product.stock);
              return (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-800 dark:text-white">{product.product_name}</td>
                  <td className="px-4 py-2">
                    <div className="max-w-xs">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className={`h-2.5 rounded-full ${color}`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <span className="mt-2 block text-sm text-gray-600 dark:text-gray-400">{label} </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {lastPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StockPage;
