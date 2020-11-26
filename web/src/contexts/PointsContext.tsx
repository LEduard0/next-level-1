import React, { createContext, FormEvent, useState, useEffect } from "react";

import api from "../services/api";
import history from "../history";

const PointsContext = createContext<any | undefined>({});

function AuthProvider({ children }: any) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const {
      data: { token },
    } = await api.post("/authenticate");

    localStorage.setItem("token", JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    history.push("/change-point");
  };

  const handleLogout = async (event: FormEvent) => {
    event.preventDefault();
    setAuthenticated(false);

    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    history.push("/login");
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <PointsContext.Provider
      value={{ authenticated, handleLogin, handleLogout }}
    >
      {children}
    </PointsContext.Provider>
  );
}

export { PointsContext, AuthProvider };
