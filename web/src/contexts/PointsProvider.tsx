import React from "react";
import PointsContext from "./PointsContext";
import useStorage from "../utils/useStorage";

const PointsProvider = ({ children }: any) => {
  const [token, setToken] = useStorage("token");
  
  return (
    <PointsContext.Provider value={{ token, setToken }}>
      {children}
    </PointsContext.Provider>
  );
};

export default PointsProvider;
