import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";

import { isValidEmail, isValidPassword, getPasswordErrors } from "../../utils/validation";
import { useRegisterMutation } from "../../app/api/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photoUrl: "",
  });

  const [register, { isLoading }] = useRegisterMutation();

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) { toast.error("Name is required"); return false; }
    if (!isValidEmail(form.email)) { toast.error("Please enter a valid email"); return false; }
    if (!isValidPassword(form.password)) {
      const errs = getPasswordErrors(form.password);
      toast.error("Password invalid: " + errs.join(" "));
      return false;
    }
    if (!form.photoUrl.trim()) { toast.error("Photo URL is required"); return false; }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        photo: form.photoUrl.trim(),
      }).unwrap(); // RTK Query unwrap() to handle success/error

      toast.success(res.message || "Registration successful");

      if (res.token) localStorage.setItem("token", res.token);
      setTimeout(() => navigate("/auth/login"), 800);
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-black rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>

      <form onSubmit={onSubmit} className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Minimum 8 chars, 1 upper, 1 lower, 1 number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Photo URL</label>
          <input
            name="photoUrl"
            type="url"
            value={form.photoUrl}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60"
          >
            {isLoading ? "Registering..." : "Register"}
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
