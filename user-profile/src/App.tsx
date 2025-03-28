import { useEffect, useState } from "react";
import UserProfile from "./components/UserProfile";

interface User {
  name: string;
  email: string;
  age: number;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<number>(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);

  useEffect(() => {
    if (userId > 10) {
      setHasMoreUsers(false);
      return;
    }

    const fetchedUserData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      const data = await response.json();
      const fetchedUser: User = {
        name: data.name || "",
        email: data.email || "",
        age: Math.floor(Math.random() * 30) + 20,
      };
      setUser(fetchedUser);
    };

    fetchedUserData();
  }, [userId]);

  const handleNextUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (userId < 10) {
      setUserId((prevId) => prevId + 1);
    } else {
      setHasMoreUsers(false);
    }
  };

  const handleReset = () => {
    setUserId(1);
    setHasMoreUsers(true);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        User Profile App
      </h1>

      {hasMoreUsers ? (
        user ? (
          <UserProfile user={user} nextUser={handleNextUser} />
        ) : (
          <p className="text-center text-white">Loading user data...</p>
        )
      ) : (
        <section className="text-center">
          <p className="text-lg mb-4 text-white">
            No more users available. You have reached the end of the list.
          </p>

          <button
            onClick={handleReset}
            className="bg-green-500 hover:bg-green-600 transition-colors text-white font-bold py-2 px-4 rounded">
            Reset and Start Over
          </button>
        </section>
      )}
    </main>
  );
};

export default App;
