import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import api from "../../services/api";
import { isValidEmail, isValidPassword, getPasswordErrors } from "../../utils/validation";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photoUrl: "", 
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!isValidPassword(form.password)) {
      const errs = getPasswordErrors(form.password);
      toast.error("Password invalid: " + errs.join(" "));
      return false;
    }
    if (!form.photoUrl.trim()) {
      toast.error("Photo URL is required");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const body = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        photo: form.photoUrl.trim(),
      };

      const res = await api.post("/api/auth/register", body);
      toast.success(res.data?.message || "Registration successful");

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      setTimeout(() => navigate("/auth/login"), 800);
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto  p-6 bg-black rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="name@example.com"
            type="email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Minimum 8 chars, 1 upper, 1 lower, 1 number"
            type="password"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Photo URL</label>
          <input
            name="photoUrl"
            value={form.photoUrl}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://example.com/photo.jpg"
            type="url"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <Link to="/auth/login" className="text-sm text-gray-600 hover:text-red-600">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
