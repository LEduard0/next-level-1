import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import PointsContext from "../../../contexts/PointsContext";

const RoutesPrivate: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}: any) => {
  const { token } = useContext(PointsContext);

  return (
    <Route
      {...rest}
      render={() =>
        token ? <Component {...rest} /> : <Redirect to="/login" />
      }
    />
  );
};

export default RoutesPrivate;
