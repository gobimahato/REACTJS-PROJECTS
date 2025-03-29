import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUpUser } = UserAuth();
  const navigate = useNavigate();

  // Handle Sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signUpUser(email, password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-md bg-white mt-20 shadow-md rounded-lg p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4">Sign up today!</h2>
        <p className="text-gray-600 mb-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in!
          </Link>
        </p>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Sign-up Button */}
          <button
            type="submit"
            disabled={loading}
            aria-label="Sign up"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-4 py-3 transition w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {loading ? "Signing up..." : "Sign up"}
          </button>

          {/* Error Message */}
          {error && <p className="text-red-400 text-center mt-6">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Signup;
