import { createContext } from "react";

const PointsContext = createContext({
  token: null,
  setToken: (_: any) => {},
});

export default PointsContext;
