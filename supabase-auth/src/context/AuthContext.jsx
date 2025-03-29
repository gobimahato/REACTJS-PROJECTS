import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  // Initialize session and listen for auth state changes
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error("Failed to get session:", error);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 🔥 Auth Actions

  // Sign-up
  const signUpUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        console.error("Sign-up error:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Unexpected sign-up error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  };

  // Sign-in
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign-in error:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Unexpected sign-in error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  };

  // Google Sign-in
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: "http://localhost:5173/dashboard" },
      });

      if (error) {
        console.error("Google sign-in error:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error("Unexpected Google sign-in error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  };

  // Sign-out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign-out error:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("Unexpected sign-out error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, signUpUser, signInUser, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for easy access
export const UserAuth = () => useContext(AuthContext);
