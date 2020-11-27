import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { PointsContext } from "../../../contexts/PointsContext";

const RoutesPrivate: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}: any) => {
  const { authenticated } = useContext(PointsContext);

  return (
    <Route
      {...rest}
      render={() =>
        authenticated ? <Component {...rest} /> : <Redirect to="/login" />
      }
    />
  );
};

export default RoutesPrivate;
