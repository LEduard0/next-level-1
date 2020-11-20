import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import PointsProvider from "./contexts/PointsProvider";

import Home from "./pages/Home";
import CreatePoint from "./pages/CreatePoint";
import Login from "./pages/Login";
import PointChange from "./pages/PointChange";

const Routes = () => {
  return (
    <BrowserRouter>
      <PointsProvider>
        <Route component={Home} path="/" exact />
        <Route component={CreatePoint} path="/create-point" />
        <Route component={Login} exact path="/login" />
        <Route component={PointChange} exact path="/change-point" />
      </PointsProvider>
    </BrowserRouter>
  );
};

export default Routes;
