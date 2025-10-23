 import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
const Product = () => {
  const role = localStorage.getItem("role");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token"); // get token
        const res = await axios.get(`${BACKEND_URL}/api/products`, {
          headers: {
            "x-auth-token": token, // send token in header
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Products fetch error:", err);
        setError(err.response?.data?.msg || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Views</th>
              <th className="p-3 border">Pricing</th>
              <th className="p-3 border">Revenue</th>
              {role === "Manager" && <th className="p-3 border">Manage</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.views}</td>
                <td className="p-3 border">${p.price}</td>
                <td className="p-3 border">${p.revenue}</td>
                {role === "Manager" && (
                  <td className="p-3 border space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white rounded">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded">
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
