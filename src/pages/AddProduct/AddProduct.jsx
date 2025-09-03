import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useAddProductMutation } from "../../app/api/productApi";

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // context থেকে token
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    photos: [],
    description: "",
    price: "",
    discount: "",
    stockStatus: true,
    status: "active",
    categories: "",
  });

  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, photos: [...files] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.token) {
      toast.error("You must be logged in to add a product");
      navigate("/auth/login");
      return;
    }

    try {
      // 1. Upload images to imgbb
      const uploadedPhotos = [];
      for (const file of formData.photos) {
        const imageForm = new FormData();
        imageForm.append("image", file);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_upload_key
          }`,
          {
            method: "POST",
            body: imageForm,
          }
        );

        const data = await res.json();
        if (data.success) {
          uploadedPhotos.push(data.data.url); // শুধু URL save করবো
        }
      }

      // 2. Build payload with uploaded image URLs
      const productPayload = {
        ...formData,
        photos: uploadedPhotos,
        stockStatus: !!formData.stockStatus,
      };

      // 3. Save product to DB
      const result = await addProduct({
        product: productPayload,
        token: user.token,
      }).unwrap();

      toast.success(result.message || "Product added successfully");

      // Reset form
      setFormData({
        name: "",
        slug: "",
        photos: [],
        description: "",
        price: "",
        discount: "",
        stockStatus: true,
        status: "active",
        categories: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Failed to add product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-900 shadow-lg rounded-xl mt-20">
      <h2 className="text-3xl font-bold mb-6 text-white">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-white font-semibold">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            value={formData.name}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-white font-semibold">Slug</label>
          <input
            type="text"
            name="slug"
            placeholder="Enter product slug"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            value={formData.slug}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-white font-semibold">
            Product Images
          </label>
          <input
            type="file"
            name="photos"
            multiple
            className="w-full border p-3 rounded "
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-white font-semibold">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter product description"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            value={formData.description}
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-2 text-white font-semibold">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="w-full border p-3 rounded"
              onChange={handleChange}
              value={formData.price}
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-white font-semibold">
              Discount %
            </label>
            <input
              type="number"
              name="discount"
              placeholder="Enter discount %"
              className="w-full border p-3 rounded"
              onChange={handleChange}
              value={formData.discount}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-2 text-white font-semibold">
              Stock Status
            </label>
            <select
              name="stockStatus"
              className="w-full border p-3 rounded"
              value={formData.stockStatus ? "true" : "false"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stockStatus: e.target.value === "true",
                })
              }
            >
              <option value="true" className="bg-gray-800 text-white">
                In Stock
              </option>
              <option value="false" className="bg-gray-800 text-white">
                Out of Stock
              </option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="block mb-2 text-white font-semibold">Status</label>
            <select
              name="status"
              className="w-full border p-3 rounded"
              onChange={handleChange}
              value={formData.status}
            >
              <option value="active" className="bg-gray-800 text-white">
                Active
              </option>
              <option value="inactive" className="bg-gray-800 text-white">
                Inactive
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-white font-semibold">
            Category
          </label>
          <input
            type="text"
            name="categories"
            placeholder="Enter category"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            value={formData.categories}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700"
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
