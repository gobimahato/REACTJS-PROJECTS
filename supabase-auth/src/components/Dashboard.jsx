import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  // Handle sign out
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error("Error during sign out:", err.message);
    }
  };

  // Extract User Data
  const user = {
    email: session?.user?.email ?? "No email",
    name: session?.user?.user_metadata?.full_name ?? "No name",
    image: session?.user?.user_metadata?.avatar_url ?? "",
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4">
      <div className="max-w-5xl mx-auto py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {user.image && (
              <img
                src={user.image}
                alt="User avatar"
                className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <h2 className="text-lg text-gray-700">
                {session
                  ? `Welcome, ${user.name} (${user.email})`
                  : "You are not logged in"}
              </h2>
            </div>
          </div>

          {/* Sign Out Button */}
          {session && (
            <button
              onClick={handleSignOut}
              className="text-red-600 hover:text-red-400 transition duration-200 ease-in-out">
              Sign out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
