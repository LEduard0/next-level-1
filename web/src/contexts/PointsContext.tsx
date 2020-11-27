import React, { createContext, FormEvent, useState, useEffect } from "react";

import api from "../services/api";

const PointsContext = createContext<any | undefined>({});

function AuthProvider({ children }: any) {
  const [authenticated, setAuthenticated] = useState(false);
  const [pointData, setPointData] = useState({});
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

    const { email, password }: any = event?.target;

    const {
      data: { point, items, token },
    } = await api.post("authenticate", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("pointData", JSON.stringify(point));
    localStorage.setItem("pointItems", JSON.stringify(items));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setPointData(JSON.stringify(point));
    setAuthenticated(true);
    window.location.href = "/change-point";
  };

  const handleLogout = async (event: FormEvent) => {
    event.preventDefault();
    setAuthenticated(false);

    localStorage.removeItem("token");
    localStorage.removeItem("pointData");
    localStorage.removeItem("pointItems");
    api.defaults.headers.Authorization = undefined;
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <PointsContext.Provider
      value={{ authenticated, handleLogin, handleLogout, pointData }}
    >
      {children}
    </PointsContext.Provider>
  );
}

export { PointsContext, AuthProvider };
