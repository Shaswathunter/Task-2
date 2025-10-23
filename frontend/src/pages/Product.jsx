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
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BACKEND_URL}/api/products`, {
          headers: { "x-auth-token": token },
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
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Products
      </h1>

      {error && (
        <p className="text-red-600 mb-4 text-center md:text-left">{error}</p>
      )}

      {/* Products Grid - Works for all screen sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold truncate">{p.name}</h2>
              <p className="text-sm text-gray-500">{p.views} views</p>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Price:</span> ${p.price}
              </p>
              <p>
                <span className="font-medium">Revenue:</span> ${p.revenue}
              </p>
            </div>
            {role === "Manager" && (
              <div className="flex justify-end space-x-2 mt-4">
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
