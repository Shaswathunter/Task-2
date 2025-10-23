import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from "../context/DarkModeContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_URL } from "../utils";

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
      const res = await axios.get(`${BACKEND_URL}/api/products`, {
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/products/${id}`, {
        headers: { "x-auth-token": token },
      });
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      const msg = err.response?.data?.msg || "Failed to delete product";
      toast.error(msg);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const openModal = (product = null) => {
    setEditingProduct(product);
    setFormData(
      product || { name: "", category: "", quantity: "", price: "", description: "" }
    );
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`${BACKEND_URL}/api/products/${editingProduct._id}`, formData, {
          headers: { "x-auth-token": token }
        });
        toast.success("Product updated successfully!");
      } else {
        await axios.post(`${BACKEND_URL}/api/products`, formData, {
          headers: { "x-auth-token": token }
        });
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

  if (loading) return <p className="text-center mt-8">Loading products...</p>;

  return (
    <div className={darkMode ? "bg-gray-900 text-gray-100 min-h-screen p-4 md:p-8" : "bg-gray-50 text-gray-900 min-h-screen p-4 md:p-8"}>
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

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className={darkMode ? "min-w-full border border-gray-700" : "min-w-full border border-gray-200"}>
          <thead className={darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"}>
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Category</th>
              <th className="p-3 border-b">Quantity</th>
              <th className="p-3 border-b">Price</th>
              <th className="p-3 border-b">Description</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                <td className="p-3 border-b truncate max-w-xs">{p.name}</td>
                <td className="p-3 border-b">{p.category}</td>
                <td className="p-3 border-b">{p.quantity}</td>
                <td className="p-3 border-b">${p.price}</td>
                <td className="p-3 border-b truncate max-w-xs">{p.description}</td>
                <td className="p-3 border-b flex space-x-2">
                  <button onClick={() => openModal(p)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {products.map((p) => (
          <div key={p._id} className={darkMode ? "bg-gray-800 shadow rounded p-4" : "bg-white shadow rounded p-4"}>
            <h2 className="text-lg font-semibold truncate">{p.name}</h2>
            <p className="text-sm mt-1"><span className="font-medium">Category:</span> {p.category}</p>
            <p className="text-sm"><span className="font-medium">Quantity:</span> {p.quantity}</p>
            <p className="text-sm"><span className="font-medium">Price:</span> ${p.price}</p>
            <p className="text-sm truncate"><span className="font-medium">Description:</span> {p.description}</p>
            <div className="flex justify-end space-x-2 mt-2">
              <button onClick={() => openModal(p)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className={darkMode ? "bg-gray-800 text-gray-100 p-6 rounded w-full max-w-md" : "bg-white p-6 rounded w-full max-w-md"}>
            <h2 className="text-xl font-bold mb-4">{editingProduct ? "Edit Product" : "Add Product"}</h2>
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
