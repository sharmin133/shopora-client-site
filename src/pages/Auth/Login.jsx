import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../app/api/authApi";
import { AuthContext } from "../../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginMutation, { isLoading }] = useLoginMutation();

  // Get the redirect path after login
  const from = location.state?.from || "/"; 

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginMutation(form).unwrap();
      login(res.token, res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);
      toast.success(res.message || "Login successful");

      // Redirect to the page user came from
      navigate(from, { replace: true }); 
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div
        className="max-w-md mx-auto p-8 bg-gray-900 dark:bg-gray-800 rounded-xl shadow-lg mt-20"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Login
        </h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={onChange}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-transform transform hover:scale-105 disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className="mt-3 text-sm text-gray-300 text-center">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="text-blue-500 hover:underline hover:text-blue-400 transition"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
