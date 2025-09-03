import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../app/api/authApi";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // এখানে login function আনো
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginMutation, { isLoading }] = useLoginMutation();

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginMutation(form).unwrap();

      // context এর login function ব্যবহার
      login(res.token, res.user);

      // localStorage update (optional)
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);

      toast.success(res.message || "Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-white">Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
          value={form.password}
          onChange={onChange}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="mt-2 text-sm text-white">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
