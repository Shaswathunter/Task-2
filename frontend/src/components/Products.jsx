import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { toast } from "react-toastify";  // ✅ Import react-toastify
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { darkMode } = useContext(DarkModeContext);
  const role = localStorage.getItem("role");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { "x-auth-token": token },
      });
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to fetch products";
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { "x-auth-token": token },
      });
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to delete product";
      toast.error(msg);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open modal for Add or Edit
  const openModal = (product = null) => {
    setEditingProduct(product);
    setFormData(
      product || { name: "", category: "", quantity: "", price: "", description: "" }
    );
    setModalOpen(true);
  };

  // Submit Add or Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          formData,
          { headers: { "x-auth-token": token } }
        );
        toast.success("Product updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          formData,
          { headers: { "x-auth-token": token } }
        );
        toast.success("Product added successfully!");
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to save product";
      setError(msg);
      toast.error(msg);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className={darkMode ? "bg-gray-900 text-gray-100 min-h-screen p-8" : "bg-gray-50 text-gray-900 min-h-screen p-8"}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add New Product
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className={darkMode ? "bg-gray-800 shadow rounded p-4 overflow-x-auto" : "bg-white shadow rounded p-4 overflow-x-auto"}>
        <table className="min-w-full border">
          <thead className={darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"}>
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.category}</td>
                <td className="p-3 border">{p.quantity}</td>
                <td className="p-3 border">${p.price}</td>
                <td className="p-3 border">{p.description}</td>
                <td className="p-3 border space-x-2">
                  <button
                    onClick={() => openModal(p)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className={darkMode ? "bg-gray-800 text-gray-100 p-6 rounded w-96" : "bg-white p-6 rounded w-96"}>
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="border p-2 rounded bg-transparent"/>
              <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="border p-2 rounded bg-transparent"/>
              <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required className="border p-2 rounded bg-transparent"/>
              <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="border p-2 rounded bg-transparent"/>
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded bg-transparent"/>
              <div className="flex justify-end space-x-2 mt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-1 bg-gray-400 text-white rounded">Cancel</button>
                <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">{editingProduct ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
