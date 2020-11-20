import { createContext } from "react";

const PointsContext = createContext({
  token: null,
  setToken: () => {},
});

export default PointsContext;
