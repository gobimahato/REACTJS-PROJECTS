import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signInUser, signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  // Handle Email Sign-in
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signInUser(email, password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithGoogle();
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Sign-in error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-md bg-white mt-20 shadow-md rounded-lg p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold mb-4">Sign in</h2>
        <p className="text-gray-600 mb-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up!
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

          {/* Sign-in Buttons */}
          <button
            type="submit"
            disabled={loading}
            aria-label="Sign in with email and password"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-4 py-3 transition w-full ${
              loading && "opacity-50 cursor-not-allowed"
            }`}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            aria-label="Sign in with Google"
            className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-full px-4 py-3 transition w-full">
            Sign in with Google
          </button>

          {/* Error Message */}
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Signin;
