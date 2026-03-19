import { createContext, useContext, useState } from "react";

// const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

  // TODO: signup
  const signup = async (formData) => {
    const username = formData.get("name");
    const request = await fetch(
      "https://fsa-jwt-practice.herokuapp.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      },
    );
    const response = await request.json();
    setToken(response.token);
    setLocation("TABLET");
  };

  // TODO: authenticate
  const authenticate = async () => {
    try {
      const req = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      await req.json();
      setLocation("TUNNEL");
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}

// thank you for all your help!
