import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../app/api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photo: "", 
  });

  const [photoFile, setPhotoFile] = useState(null); 
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files.length > 0) {
      setPhotoFile(files[0]);
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  };

  const validate = () => {
    if (!form.name.trim()) { toast.error("Name is required"); return false; }
    if (!form.email.trim()) { toast.error("Email is required"); return false; }
    if (!form.password.trim()) { toast.error("Password is required"); return false; }
    if (!photoFile) { toast.error("Photo is required"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // 1️⃣ Upload photo to imgbb
      const imageForm = new FormData();
      imageForm.append("image", photoFile);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        {
          method: "POST",
          body: imageForm,
        }
      );
      const data = await res.json();

      if (!data.success) throw new Error("Image upload failed");

      const photoUrl = data.data.url;

      // 2️⃣ Send register request
      const result = await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        photo: photoUrl,
      }).unwrap();

      toast.success(result.message || "Registration successful");

      if (result.token) localStorage.setItem("token", result.token);
      setTimeout(() => navigate("/auth/login"), 800);
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Registration failed");
    }
  };

  return (
<div className="min-h-screen p-8">

      <div className="max-w-xl mx-auto p-6 bg-gray-900 dark:bg-gray-800 rounded-md shadow-md mt-20">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">Create an account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          className="w-full border rounded px-3 py-2"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          className="w-full border rounded px-3 py-2"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Minimum 8 chars, 1 upper, 1 lower, 1 number"
          className="w-full border rounded px-3 py-2"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1 text-white">Profile Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
</div>
  );
};

export default Register;
